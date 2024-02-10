'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from "../components/lib/prisma"

export const addMemo = async (data: FormData) => {
  const name = data.get('name') as string;
  const content = data.get('content') as string; 
  const userId = data.get('userId') as string; 
  await prisma.memo.create({ data: { 
    name, 
    content,
    user: { connect: { id: Number(userId) } } 
} });
  revalidatePath('/travel_brochure/memo');
};


export const deleteMemo = async (id: number) => {
  await prisma.memo.delete({
    where: {
      id,
    },
  });
  revalidatePath('/travel_brochure/memo');
  redirect('/travel_brochure/memo');
};

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
  revalidatePath('/travel_brochure/memo');
  redirect('/travel_brochure/memo');
};
