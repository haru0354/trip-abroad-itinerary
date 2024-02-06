'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../components/lib/prisma"

export const addItinerary = async (data: FormData) => {
  const date = data.get("date") as string;
  const time = data.get("time") as string;
  const name = data.get("name") as string;
  const content = data.get("content") as string;
  const hideContent = data.get("hideContent") as string;
  const userId = data.get('userId') as string; 
  await prisma.itinerary.create({ data: { date, time, name, content, hideContent, userId } })
  revalidatePath('/itinerary');
}

export const deleteItinerary = async (id: number) => {
  await prisma.itinerary.delete({
    where: {
      id,
    },
  });
  revalidatePath('/itinerary');
  redirect('/itinerary');
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

export const showContent = async (data: FormData) => {
  const id = data.get("id") as string;
  const isShowContent = data.get("isShowContent")  === "false";
  await prisma.itinerary.update({
    where: {
      id: Number(id),
    },
    data: {
      isShowContent,
    },
  })
  revalidatePath('/itinerary');
}