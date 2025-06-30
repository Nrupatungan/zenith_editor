/*
  Warnings:

  - You are about to drop the column `thumbnailUrl` on the `Object` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Object_id_objectUrl_thumbnailUrl_idx";

-- AlterTable
ALTER TABLE "Object" DROP COLUMN "thumbnailUrl",
ALTER COLUMN "alt" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Object_id_objectUrl_type_idx" ON "Object"("id", "objectUrl", "type");
