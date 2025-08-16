/*
  Warnings:

  - The primary key for the `Object` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Object` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Object_id_objectUrl_idx";

-- AlterTable
ALTER TABLE "public"."Object" DROP CONSTRAINT "Object_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Object_pkey" PRIMARY KEY ("fileId");

-- CreateIndex
CREATE INDEX "Object_fileId_objectUrl_idx" ON "public"."Object"("fileId", "objectUrl");
