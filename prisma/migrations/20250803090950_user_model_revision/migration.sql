-- DropIndex
DROP INDEX "User_id_email_password_idx";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isPremium" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "User_id_email_password_isPremium_idx" ON "User"("id", "email", "password", "isPremium");
