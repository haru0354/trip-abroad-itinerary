import prisma from "@/app/lib/prisma";

export async function getItineraryHomes(userId?: number) {
  const itineraryHomes = await prisma.itineraryHome.findMany({
    where: {
      userId,
    }
  });

  return itineraryHomes;
}

export async function getItineraryHome(
  itineraryHomeId: string,
  includeOptions?: string
) {
  const id = Number(itineraryHomeId);

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

  const itineraryHome = await prisma.itineraryHome.findUnique({
    where: {
      id,
    },
    include: include,
  });

  return itineraryHome;
}

export async function getMemo(memoId: string) {
  const id = Number(memoId);

  const memo = await prisma.memo.findUnique({
    where: {
      id,
    },
  });

  return memo;
}

export async function getItinerary(itineraryId: string) {
  const id = Number(itineraryId);

  const itinerary = await prisma.itinerary.findUnique({
    where: {
      id,
    },
  });

  return itinerary;
}
