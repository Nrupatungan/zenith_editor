/*
  Warnings:

  - You are about to drop the column `isPremium` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."User_id_email_password_isPremium_idx";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "isPremium";

-- CreateTable
CREATE TABLE "public"."Payment" (
    "razorpay_payment_id" TEXT NOT NULL,
    "razorpay_order_id" TEXT NOT NULL,
    "razorpay_signature" TEXT NOT NULL,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "billing_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "gstin" TEXT NOT NULL,
    "billing_address" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("razorpay_payment_id","razorpay_order_id")
);

-- CreateIndex
CREATE INDEX "User_id_email_password_idx" ON "public"."User"("id", "email", "password");

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
