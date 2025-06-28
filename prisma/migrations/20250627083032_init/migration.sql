/*
  Warnings:

  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Video";

-- CreateTable
CREATE TABLE "Object" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "objectUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "alt" TEXT NOT NULL,
    "controls" BOOLEAN DEFAULT true,
    "transformationHeight" INTEGER DEFAULT 1920,
    "transformationWidth" INTEGER DEFAULT 1080,
    "transformationQuality" INTEGER DEFAULT 80,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Object_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Object_id_objectUrl_thumbnailUrl_idx" ON "Object"("id", "objectUrl", "thumbnailUrl");

-- AddForeignKey
ALTER TABLE "Object" ADD CONSTRAINT "Object_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
