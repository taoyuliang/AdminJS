/*
  Warnings:

  - You are about to drop the column `location2` on the `markers` table. All the data in the column will be lost.
  - Added the required column `location` to the `markers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "IDX_ac07a7a14b21f94b434b2c0f5e";

-- AlterTable
ALTER TABLE "markers" DROP COLUMN "location2",
ADD COLUMN     "location" geography(Point, 4326) NOT NULL;

-- CreateIndex
CREATE INDEX "IDX_ac07a7a14b21f94b434b2c0f5e" ON "markers" USING GIST ("location");
