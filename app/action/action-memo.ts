'use server';
import { revalidatePath } from 'next/cache';

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

export const updateMemo = async (data: FormData) => {
  const id = data.get('id') as string;
  const name = data.get('name') as string;
  const content = data.get('content') as string;
  await prisma.memo.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      content,
    },
  });
  revalidatePath('/memo');
};
