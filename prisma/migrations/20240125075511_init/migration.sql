-- CreateTable
CREATE TABLE "memo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "memo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itinerary" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "hideContent" TEXT NOT NULL,
    "isShowContent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "itinerary_pkey" PRIMARY KEY ("id")
);
