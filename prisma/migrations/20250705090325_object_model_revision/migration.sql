/*
  Warnings:

  - You are about to drop the column `type` on the `Object` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Object_id_objectUrl_type_idx";

-- AlterTable
ALTER TABLE "Object" DROP COLUMN "type";

-- CreateIndex
CREATE INDEX "Object_id_objectUrl_idx" ON "Object"("id", "objectUrl");
