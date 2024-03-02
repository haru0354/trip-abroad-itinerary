-- CreateTable
CREATE TABLE "DashboardMemo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DashboardMemo_pkey" PRIMARY KEY ("id")
);
