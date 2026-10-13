/*
  Warnings:

  - You are about to drop the column `name` on the `Employee` table. All the data in the column will be lost.
  - The `employmentStatus` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "name",
DROP COLUMN "employmentStatus",
ADD COLUMN     "employmentStatus" "EmploymentStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "roles" "ROLES"[] DEFAULT ARRAY[]::"ROLES"[];
