/*
  Warnings:

  - A unique constraint covering the columns `[title,manufacturer]` on the table `Medicines` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Medicines_title_manufacturer_key" ON "Medicines"("title", "manufacturer");
