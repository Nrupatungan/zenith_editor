/*
  Warnings:

  - The primary key for the `Payment` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_pkey",
ADD CONSTRAINT "Payment_pkey" PRIMARY KEY ("razorpay_payment_id");
