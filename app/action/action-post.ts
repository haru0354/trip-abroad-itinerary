"use server"

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from "../components/lib/prisma"

export const addPost = async (data:FormData) => {
    const createdDate = data.get("createdDate") as string;
    const updatedDate = data.get("createdDate") as string;
    const title = data.get("title") as string;
    const content = data.get("content") as string;
    const category = data.get("category") as string;
    const description = data.get("description") as string; 
    await prisma.post.create({ data: {  
        createdDate,
        updatedDate,
        title,
        content,
        category,
        description,
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
    const updatedDate = data.get("updatedDate") as string;
    const title = data.get("title") as string;
    const content = data.get("content") as string;
    const category = data.get("category") as string;
    const description = data.get("description") as string; 
    await prisma.post.update({ 
        where: {
            id,
        },
        data: {
            updatedDate,
            title,
            content,
            category,
            description,
    }})
    revalidatePath("/home");
    redirect("/home");
}