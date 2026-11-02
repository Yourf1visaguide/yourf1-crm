-- Remove the previous global phone uniqueness constraint.
DROP INDEX IF EXISTS "Client_normalizedPhone_key";

-- Enforce phone uniqueness within a branch.
CREATE UNIQUE INDEX "Client_branchId_normalizedPhone_key"
ON "Client" ("branchId", "normalizedPhone");

-- Support phone searches across branches.
CREATE INDEX "Client_normalizedPhone_idx"
ON "Client" ("normalizedPhone");