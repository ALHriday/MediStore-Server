/*
  Warnings:

  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('admin', 'customer', 'seller');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'ban');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'active',
DROP COLUMN "role",
ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'customer';
