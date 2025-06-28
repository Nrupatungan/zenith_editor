/*
  Warnings:

  - You are about to drop the column `controls` on the `Object` table. All the data in the column will be lost.
  - You are about to drop the column `transformationHeight` on the `Object` table. All the data in the column will be lost.
  - You are about to drop the column `transformationQuality` on the `Object` table. All the data in the column will be lost.
  - You are about to drop the column `transformationWidth` on the `Object` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Object" DROP COLUMN "controls",
DROP COLUMN "transformationHeight",
DROP COLUMN "transformationQuality",
DROP COLUMN "transformationWidth";
