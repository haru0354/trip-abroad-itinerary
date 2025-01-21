import prisma from "@/app/lib/prisma";

export async function getTrips(userId?: number) {
  const trips = await prisma.trip.findMany({
    where: {
      userId,
    }
  });

  return trips;
}

export async function getTrip(
  tripId: string,
  includeOptions?: string
) {
  const id = Number(tripId);

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
      id,
    },
    include: include,
  });

  return trip;
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
