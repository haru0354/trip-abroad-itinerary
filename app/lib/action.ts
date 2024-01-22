'use server';
import { revalidatePath } from 'next/cache';

export const addTodo = async (data: FormData) => {
    const name = data.get('name') as string;
    const content = data.get('content') as string; 
    await prisma.memo.create({ data: { name, content } });
    revalidatePath('/todos');
  };