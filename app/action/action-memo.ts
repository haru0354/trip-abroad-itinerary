'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const addMemo = async (data: FormData) => {
    const name = data.get('name') as string;
    const content = data.get('content') as string; 
    await prisma.memo.create({ data: { name, content } });
    revalidatePath('/memo');
  };

export const deleteMemo = async (id: number) => {
  await prisma.memo.delete({
    where: {
      id,
    },
  });
  revalidatePath('/memo');
  redirect('/memo');
};

