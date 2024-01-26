'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export const updateItinerary = async (id: number, data:FormData) => {
  const date = data.get('date') as string;
  const time = data.get('time') as string;
  const name = data.get('name') as string;
  const content = data.get('content') as string;
  const hideContent = data.get('hideContent') as string;
  await prisma.itinerary.update({
    where: {
      id: Number(id),
    },
    data: {
      date,
      time,
      name,
      content,
      hideContent,
    },
  })
  revalidatePath('/itinerary');
  redirect('/itinerary');
}

export const updateMemo = async (id: number, data: FormData) => {
  const name = data.get('name') as string;
  const content = data.get('content') as string;
  await prisma.memo.update({
    where: {
      id,
    },
    data: {
      name,
      content,
    },
  });
  revalidatePath('/memo');
  redirect('/memo');
};
