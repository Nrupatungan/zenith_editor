/*
  Warnings:

  - You are about to drop the column `razorpay_order_id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `razorpay_signature` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Payment" DROP COLUMN "razorpay_order_id",
DROP COLUMN "razorpay_signature";
