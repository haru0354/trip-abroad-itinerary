import prisma from "@/app/lib/prisma";
import { getCurrentUserId } from "@/app/lib/getCurrentUser";

export const validateTripOwner = async (tripId: string): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      console.error("認証がされていません。");
      return false;
    }

    const validateOwner = await prisma.trip.findUnique({
      where: {
        id: Number(tripId),
        userId: userId,
      },
    });

    if (!validateOwner) {
      console.error("所有権がありません。");
      return false;
    }

    return Boolean(validateOwner);
  } catch (error) {
    console.error("所有権の確認中にエラーが発生しました:", error);
    return false;
  }
};
