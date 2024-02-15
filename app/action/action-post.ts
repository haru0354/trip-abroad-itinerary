"use server"

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from "../components/lib/prisma"

export const addBlog = async (data:FormData) => {
    const createdDate = data.get("createdDate") as string;
    const updatedDate = data.get("createdDate") as string;
    const title = data.get("title") as string;
    const content = data.get("content") as string;
    const category = data.get("category") as string;
    const slug = data.get("slug") as string; 
    await prisma.post.create({ data: {  
        createdDate,
        updatedDate,
        title,
        content,
        category,
        slug,
    }});
    revalidatePath("./home");
    redirect("./home")
}

  