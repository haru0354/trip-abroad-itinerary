import prisma from "@/app/lib/prisma";

export const validateTripOwner = async (
  userId: number,
  itineraryHomeId: number
): Promise<boolean> => {
  const validateOwner = await prisma.itineraryHome.findFirst({
    where: {
      id: itineraryHomeId,
      userId: userId,
    },
  });

  if (!validateOwner) {
    console.error("所有件がありません。");
  }

  // 所有権があればtrue、なければfalseを返す
  return Boolean(validateOwner);
};
