'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const addMemo = async (data: FormData) => {
    const name = data.get('name') as string;
    const content = data.get('content') as string; 
    await prisma.memo.create({ data: { name, content } });
    revalidatePath('/memo');
  };

export const deleteMemo = async (data: FormData) => {
  const id = data.get('id') as string;
  await prisma.memo.delete({
    where: {
      id: Number(id),
    },
  });
  revalidatePath('/memo');
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
  revalidatePath('/memo');
  redirect('/memo');
};

