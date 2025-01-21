-- 1. 新しい Trip テーブルを作成
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "startDate" TEXT,
    "endDate" TEXT,
    "name" TEXT NOT NULL,
    "destination" TEXT,
    "userId" INTEGER NOT NULL,
    "blog" BOOLEAN NOT NULL DEFAULT false,
    "share" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- 2. ItineraryHome のデータを Trip にコピー
INSERT INTO "Trip" ("id", "startDate", "endDate", "name", "destination", "userId", "blog", "share")
SELECT "id", "startDate", "endDate", "name", "destination", "userId", "blog", "share" FROM "ItineraryHome";

-- 3. Itinerary と Memo に tripId を追加
ALTER TABLE "Itinerary" ADD COLUMN "tripId" INTEGER;
ALTER TABLE "Memo" ADD COLUMN "tripId" INTEGER;

-- 4. itineraryHomeId に基づき tripId を設定
UPDATE "Itinerary" SET "tripId" = (
  SELECT "id" FROM "Trip" WHERE "Trip"."id" = "Itinerary"."itineraryHomeId"
);
UPDATE "Memo" SET "tripId" = (
  SELECT "id" FROM "Trip" WHERE "Trip"."id" = "Memo"."itineraryHomeId"
);

-- 5. tripId を必須に設定
ALTER TABLE "Itinerary" ALTER COLUMN "tripId" SET NOT NULL;
ALTER TABLE "Memo" ALTER COLUMN "tripId" SET NOT NULL;

-- 6. 古いカラムとテーブルの削除
ALTER TABLE "Itinerary" DROP COLUMN "itineraryHomeId";
ALTER TABLE "Memo" DROP COLUMN "itineraryHomeId";
DROP TABLE "ItineraryHome";

-- 7. 外部キー制約を追加
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Memo" ADD CONSTRAINT "Memo_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
