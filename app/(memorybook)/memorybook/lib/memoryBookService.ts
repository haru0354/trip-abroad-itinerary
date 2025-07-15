import { getCurrentUserId } from "@/app/lib/getCurrentUser";
import prisma from "@/app/lib/prisma";

export async function getTrips() {
  try {
    const sessionUserId = await getCurrentUserId();

    if (!sessionUserId) {
      console.error("userIdの取得に失敗しました。");
      throw new Error("ユーザーIDを取得できませんでした。");
    }

    const trips = await prisma.trip.findMany({
      where: {
        userId: sessionUserId,
      },
    });

    return trips;
  } catch (error) {
    console.error("旅行の一覧の取得に失敗しました。");
    return null;
  }
}

export async function getTrip(
  tripId: string,
  includeOptions?: "itineraries" | "memos"
) {
  try {
    const sessionUserId = await getCurrentUserId();

    if (!sessionUserId) {
      console.error("userIdの取得に失敗しました。");
      throw new Error("ユーザーIDを取得できませんでした。");
    }

    let include: {
      itineraries?: boolean;
      memos?: boolean;
    } = { itineraries: false, memos: false };

    if (includeOptions === "itineraries") {
      include = {
        itineraries: true,
      };
    }

    if (includeOptions === "memos") {
      include = {
        memos: true,
      };
    }

    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId,
      },
      include: include,
    });

    if (!trip) {
      console.error("個別の旅行データが見つかりませんでした。");
      return null;
    }

    if (sessionUserId !== trip?.userId) {
      console.error("権限の確認に失敗しました。");
      return null;
    }

    return trip;
  } catch (error) {
    console.error("個別の旅行データの取得に失敗しました。", error);
    return null;
  }
}

export async function getMemo(memoId: string) {
  try {
    const sessionUserId = await getCurrentUserId();

    if (!sessionUserId) {
      console.error("userIdの取得に失敗しました。");
      throw new Error("ユーザーIDを取得できませんでした。");
    }

    const memo = await prisma.memo.findUnique({
      where: {
        id: memoId,
      },
    });

    if (!memo) {
      console.error("個別のメモが取得できませんでした。");
      return null;
    }

    if (sessionUserId !== memo?.userId) {
      console.error("権限の確認に失敗しました。");
      return null;
    }

    return memo;
  } catch (error) {
    console.error("個別のメモの取得に失敗しました。", error);
    return null;
  }
}

export async function getItinerary(itineraryId: string) {
  try {
    const sessionUserId = await getCurrentUserId();

    if (!sessionUserId) {
      console.error("userIdの取得に失敗しました。");
      throw new Error("ユーザーIDを取得できませんでした。");
    }

    const itinerary = await prisma.itinerary.findUnique({
      where: {
        id: itineraryId,
      },
    });

    if (!itinerary) {
      console.error("個別の旅程が取得できませんでした。");
      return null;
    }

    if (sessionUserId !== itinerary?.userId) {
      console.error("権限の確認に失敗しました。");
      return null;
    }

    return itinerary;
  } catch (error) {
    console.error("個別の旅程の取得に失敗しました。", error);
    return null;
  }
}

export async function getShareTrip(tripId: string) {
  try {
    if (!tripId) {
      console.error("tripIdが指定されていません。");
      return null;
    }

    const shareTrip = await prisma.trip.findUnique({
      where: {
        id: tripId,
      },
      include: {
        itineraries: true,
      },
    });

    if (!shareTrip) {
      console.error("共有された旅程表が見つかりませんでした。");
      return null;
    }

    if (shareTrip.share === false) {
      console.error("共有されていない旅程表です。");
      return null;
    }

    return shareTrip;
  } catch (error) {
    console.error("共有された旅行データの取得に失敗しました。", error);
    return null;
  }
}
