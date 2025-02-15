/*
  Warnings:

  - You are about to drop the column `company` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Referral` table. All the data in the column will be lost.
  - Added the required column `yourEmail` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yourName` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Referral" DROP COLUMN "company",
DROP COLUMN "email",
DROP COLUMN "message",
DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "course" TEXT,
ADD COLUMN     "friendEmail" TEXT,
ADD COLUMN     "friendName" TEXT,
ADD COLUMN     "yourEmail" TEXT NOT NULL,
ADD COLUMN     "yourName" TEXT NOT NULL;
