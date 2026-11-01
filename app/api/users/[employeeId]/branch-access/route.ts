import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/api-error";
import { requirePermission } from "@/lib/auth/require-permission";
import {
  handleApiError,
  successResponse,
} from "@/lib/api-response";

import {
  assertActiveBranch,
} from "@/lib/auth/branch-access";

import { z } from "zod";

const branchAccessSchema = z.object({
  primaryBranchId: z.string().trim().min(1),
  additionalBranchIds: z.array(
    z.string().trim().min(1),
  ).max(100),
}).strict().superRefine((data, ctx) => {
  if (
    new Set(data.additionalBranchIds).size !==
    data.additionalBranchIds.length
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["additionalBranchIds"],
      message: "Duplicate branch assignments are not allowed.",
    });
  }

  if (
    data.additionalBranchIds.includes(
      data.primaryBranchId,
    )
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["additionalBranchIds"],
      message: "Primary branch cannot also be an additional branch.",
    });
  }
});

type RouteContext = {
  params: Promise<{
    employeeId: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  { params }: RouteContext,
) {
  try {
    await requirePermission("BRANCH_ACCESS_MANAGE");

    const { employeeId } = await params;

    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            branchId: true,
            branch: {
              select: {
                id: true,
                name: true,
                branchCode: true,
              },
            },
            branchAccesses: {
              select: {
                branchId: true,
                branch: {
                  select: {
                    id: true,
                    name: true,
                    branchCode: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!employee) {
      throw new ApiError(
        "NOT_FOUND",
        "Employee not found.",
        404,
      );
    }

    return successResponse({
      primaryBranchId: employee.user.branchId,
      primaryBranch: employee.user.branch,
      additionalBranches:
        employee.user.branchAccesses.map(
          (item) => item.branch,
        ),
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const actor = await requirePermission(
      "BRANCH_ACCESS_MANAGE",
    );

    const { employeeId } = await params;

    const body: unknown = await request.json();
    const data = branchAccessSchema.parse(body);

    const result = await prisma.$transaction(
      async (tx) => {
        const employee = await tx.employee.findUnique({
          where: {
            id: employeeId,
          },
          select: {
            id: true,
            userId: true,
            user: {
              select: {
                branchId: true,
                branchAccesses: {
                  select: {
                    branchId: true,
                  },
                },
              },
            },
          },
        });

        if (!employee) {
          throw new ApiError(
            "NOT_FOUND",
            "Employee not found.",
            404,
          );
        }

        await assertActiveBranch(
          tx,
          data.primaryBranchId,
        );

        const allAdditionalIds = [
          ...new Set(data.additionalBranchIds),
        ];

        if (allAdditionalIds.length > 0) {
          const activeBranches =
            await tx.branch.findMany({
              where: {
                id: {
                  in: allAdditionalIds,
                },
                isActive: true,
              },
              select: {
                id: true,
              },
            });

          if (
            activeBranches.length !==
            allAdditionalIds.length
          ) {
            throw new ApiError(
              "BAD_REQUEST",
              "One or more additional branches do not exist or are inactive.",
              400,
            );
          }
        }

        const previousPrimary =
          employee.user.branchId;

        const previousAdditional =
          employee.user.branchAccesses.map(
            (item) => item.branchId,
          );

        const nextAdditional =
          allAdditionalIds.filter(
            (id) => id !== data.primaryBranchId,
          );

        await tx.user.update({
          where: {
            id: employee.userId,
          },
          data: {
            branchId: data.primaryBranchId,
          },
        });

        await tx.userBranchAccess.deleteMany({
          where: {
            userId: employee.userId,
          },
        });

        if (nextAdditional.length > 0) {
          await tx.userBranchAccess.createMany({
            data: nextAdditional.map(
              (branchId) => ({
                userId: employee.userId,
                branchId,
              }),
            ),
          });
        }

        const previousSet = new Set([
          ...(previousPrimary ? [previousPrimary] : []),
          ...previousAdditional,
        ]);

        const nextSet = new Set([
          data.primaryBranchId,
          ...nextAdditional,
        ]);

        const added = [...nextSet].filter(
          (id) => !previousSet.has(id),
        );

        const removed = [...previousSet].filter(
          (id) => !nextSet.has(id),
        );

        if (
          previousPrimary !== data.primaryBranchId ||
          added.length > 0 ||
          removed.length > 0
        ) {
          await tx.auditLog.create({
            data: {
              actorId: actor.id,
              action: "EMPLOYEE_BRANCH_ACCESS_UPDATED",
              entityType: "User",
              entityId: employee.userId,
              metadata: {
                employeeId,
                previousPrimaryBranchId:
                  previousPrimary,
                primaryBranchId:
                  data.primaryBranchId,
                addedBranchIds: added,
                removedBranchIds: removed,
              },
            },
          });
        }

        return {
          primaryBranchId: data.primaryBranchId,
          additionalBranchIds: nextAdditional,
        };
      },
    );

    return successResponse(result, {
      message: "Employee branch access updated successfully.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}