'use server';

import { revalidatePath } from "next/cache";

export const deleteItinerary = async (data: FormData) => {
    const id = data.get('id') as string;
    await prisma.itinerary.delete({
      where: {
        id: Number(id),
      },
    });
    revalidatePath('/itinerary');
  };

