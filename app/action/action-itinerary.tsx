'use server';

import { revalidatePath } from "next/cache";

export const addItinerary = async (data: FormData) => {
  const date = data.get("date") as string;
  const time = data.get("time") as string;
  const name = data.get("name") as string;
  const content = data.get("content") as string;
  const hideContent = data.get("hideContent") as string;
  await prisma.itinerary.create({ data: { date, time, name, content, hideContent } })
  revalidatePath('/itinerary');
}

export const deleteItinerary = async (data: FormData) => {
    const id = data.get('id') as string;
    await prisma.itinerary.delete({
      where: {
        id: Number(id),
      },
    });
    revalidatePath('/itinerary');
  };

