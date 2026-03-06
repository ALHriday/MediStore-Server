/*
  Warnings:

  - The values [admin,customer,seller] on the enum `ROLE` will be removed. If these variants are still used in the database, this will fail.
  - The values [active,ban] on the enum `UserStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `productId` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `cashOnDelivery` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Reviews` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Medicines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicineId` to the `Reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PLACED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- AlterEnum
BEGIN;
CREATE TYPE "ROLE_new" AS ENUM ('ADMIN', 'SELLER', 'CUSTOMER');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "ROLE_new" USING ("role"::text::"ROLE_new");
ALTER TYPE "ROLE" RENAME TO "ROLE_old";
ALTER TYPE "ROLE_new" RENAME TO "ROLE";
DROP TYPE "public"."ROLE_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserStatus_new" AS ENUM ('ACTIVE', 'BAN');
ALTER TABLE "public"."User" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "status" TYPE "UserStatus_new" USING ("status"::text::"UserStatus_new");
ALTER TYPE "UserStatus" RENAME TO "UserStatus_old";
ALTER TYPE "UserStatus_new" RENAME TO "UserStatus";
DROP TYPE "public"."UserStatus_old";
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_productId_fkey";

-- DropForeignKey
ALTER TABLE "Medicines" DROP CONSTRAINT "Medicines_userId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_productId_fkey";

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_productId_fkey";

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "productId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Medicines" ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "image" TEXT,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "cashOnDelivery",
DROP COLUMN "productId",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PLACED',
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "productId",
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "medicineId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "status" SET DEFAULT 'ACTIVE',
ALTER COLUMN "role" SET DEFAULT 'CUSTOMER';

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");

-- AddForeignKey
ALTER TABLE "Medicines" ADD CONSTRAINT "Medicines_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicines" ADD CONSTRAINT "Medicines_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
