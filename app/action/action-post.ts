"use server"

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from "../components/lib/prisma"

export const addPost = async (data:FormData) => {
    const title = data.get("title") as string;
    const content = data.get("content") as string;
    const description = data.get("description") as string; 
    const slug = data.get("slug") as string; 
    const categoryId = data.get("categoryId") as string; 
    await prisma.post.create({ data: {  
        title,
        content,
        description,
        slug,
        category: { connect: { id: Number(categoryId) } }
    }});
    revalidatePath("/home");
    redirect("/home")
}

export const deletePost = async (id: number) => {
    await prisma.post.delete({
        where: {
            id
        }
    })
    revalidatePath("/home");
    redirect("/home")
}

export const updatePost = async (id: number, data: FormData) => {
    const title = data.get("title") as string;
    const content = data.get("content") as string;
    const description = data.get("description") as string; 
    const slug = data.get("slug") as string; 
    const categoryId = data.get("categoryId") as string; 
    await prisma.post.update({ 
        where: {
            id,
        },
        data: {
            title,
            content,
            description,
            slug,
            category: { connect: { id: Number(categoryId) } }
    }})
    revalidatePath("/home");
    redirect("/home");
}

