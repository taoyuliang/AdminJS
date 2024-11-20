/*
  Warnings:

  - You are about to drop the `maps` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `markers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "markers" DROP CONSTRAINT "FK_d41685ccfdacf01c9be1e955105";

-- DropTable
DROP TABLE "maps";

-- DropTable
DROP TABLE "markers";
