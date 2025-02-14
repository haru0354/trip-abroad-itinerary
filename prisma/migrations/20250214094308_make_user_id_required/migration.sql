/*
  Warnings:

  - Made the column `userId` on table `Itinerary` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Memo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Itinerary" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Memo" ALTER COLUMN "userId" SET NOT NULL;
