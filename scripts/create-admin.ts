// import { loadEnvConfig } from "@next/env";

// loadEnvConfig(process.cwd());

// async function main() {
//   const { auth } = await import("../lib/auth");
//   const { prisma } = await import("../lib/prisma");
//   const { ROLES, DEPARTMENT, EmploymentStatus } =
//     await import("../prisma/generated/prisma/enums");

//   const email = "admin@gmail.com";
//   const password = "admin1234";
//   const name = "Admin";

//   const existingUser = await prisma.user.findUnique({
//     where: { email },
//     select: {
//       id: true,
//       employee: {
//         select: {
//           id: true,
//         },
//       },
//     },
//   });

//   if (existingUser) {
//     throw new Error(`A user with ${email} already exists.`);
//   }

//   const result = await auth.api.signUpEmail({
//     body: {
//       name,
//       email,
//       password,
//     },
//   });

//   if (!result.user) {
//     throw new Error("Better Auth did not return a user.");
//   }

//   const userId = result.user.id;

//   try {
//     const employee = await prisma.$transaction(async (tx) => {
//       await tx.user.update({
//         where: { id: userId },
//         data: {
//           roles: {
//             set: [ROLES.ADMIN],
//           },
//           isActive: true,
//           emailVerified: true,
//         },
//       });

//       return tx.employee.create({
//         data: {
//           employeeCode: "EMP-ADMIN-002",
//           department: DEPARTMENT.ADMIN,
//           designation: "Administrator",
//           joiningDate: new Date(),
//           employmentStatus: EmploymentStatus.ACTIVE,
//           user: {
//             connect: {
//               id: userId,
//             },
//           },
//         },
//       });
//     });

//     console.log("Admin account created successfully.");
//     console.log(`Email: ${email}`);
//     console.log(`Password: ${password}`);
//     console.log(`Employee ID: ${employee.id}`);
//   } catch (error) {
//     // Better Auth already created the user, so clean it up
//     // if employee creation fails.
//     await prisma.user.delete({
//       where: { id: userId },
//     });

//     throw error;
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main().catch((error) => {
//   console.error(error);
//   process.exit(1);
// });