/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the `UserImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserImageToItinerary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserImageToMemo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserImage" DROP CONSTRAINT "UserImage_userId_fkey";

-- DropForeignKey
ALTER TABLE "_UserImageToItinerary" DROP CONSTRAINT "_UserImageToItinerary_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserImageToItinerary" DROP CONSTRAINT "_UserImageToItinerary_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserImageToMemo" DROP CONSTRAINT "_UserImageToMemo_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserImageToMemo" DROP CONSTRAINT "_UserImageToMemo_B_fkey";

-- AlterTable
ALTER TABLE "Itinerary" DROP COLUMN "imageUrl",
ADD COLUMN     "userImageId" INTEGER;

-- DropTable
DROP TABLE "UserImage";

-- DropTable
DROP TABLE "_UserImageToItinerary";

-- DropTable
DROP TABLE "_UserImageToMemo";

-- CreateTable
CREATE TABLE "ItineraryImage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "itineraryId" INTEGER NOT NULL,

    CONSTRAINT "ItineraryImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItineraryImage" ADD CONSTRAINT "ItineraryImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItineraryImage" ADD CONSTRAINT "ItineraryImage_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
