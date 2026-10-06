// lib/auth/get-current-user.ts

import "server-only";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      isActive: true,
      roles: true,

      employee: {
        select: {
          id: true,
          employeeCode: true,
          department: true,
          designation: true,
          employmentStatus: true,
        },
      },
    },
  });

  if (!user || !user.isActive) {
    return null;
  }

  return user;
}