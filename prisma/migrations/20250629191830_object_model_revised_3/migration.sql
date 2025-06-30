/*
  Warnings:

  - Added the required column `fileId` to the `Object` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Object" ADD COLUMN     "fileId" TEXT NOT NULL;
