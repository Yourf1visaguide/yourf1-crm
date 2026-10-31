/*
  Warnings:

  - Added the required column `branchId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WhatsAppChannelProvider" AS ENUM ('AISENSY', 'FACEBOOK_ADS', 'INSTAGRAM_ADS', 'WHATSAPP');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "branchId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserBranchAccess" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBranchAccess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserBranchAccess_branchId_idx" ON "UserBranchAccess"("branchId");

-- CreateIndex
CREATE UNIQUE INDEX "UserBranchAccess_userId_branchId_key" ON "UserBranchAccess"("userId", "branchId");

-- AddForeignKey
ALTER TABLE "UserBranchAccess" ADD CONSTRAINT "UserBranchAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBranchAccess" ADD CONSTRAINT "UserBranchAccess_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
