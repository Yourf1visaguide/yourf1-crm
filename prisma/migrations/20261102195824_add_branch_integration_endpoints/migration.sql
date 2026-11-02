-- CreateEnum
CREATE TYPE "IntegrationProvider" AS ENUM ('SUKAM_IVR', 'META_WHATSAPP');

-- CreateTable
CREATE TABLE "BranchIntegrationEndpoint" (
    "id" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "provider" "IntegrationProvider" NOT NULL,
    "displayName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "providerEndpointId" TEXT NOT NULL,
    "providerAccountId" TEXT,
    "credentialsEncrypted" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BranchIntegrationEndpoint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BranchIntegrationEndpoint_branchId_provider_isActive_idx" ON "BranchIntegrationEndpoint"("branchId", "provider", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "BranchIntegrationEndpoint_branchId_provider_phoneNumber_key" ON "BranchIntegrationEndpoint"("branchId", "provider", "phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "BranchIntegrationEndpoint_provider_providerEndpointId_key" ON "BranchIntegrationEndpoint"("provider", "providerEndpointId");

-- AddForeignKey
ALTER TABLE "BranchIntegrationEndpoint" ADD CONSTRAINT "BranchIntegrationEndpoint_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
