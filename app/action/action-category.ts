"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../components/lib/prisma";

export const addCategory = async (data:FormData) => {
    const name = data.get("name") as string;
    const slug = data.get("slug") as string;
    const content = data.get("content") as string;
    const description = data.get("description") as string;
    await prisma.category.create({ data: {  
        name,
        slug,
        content,
        description,
    }});
    revalidatePath("/home/category");
}

export const deleteCategory = async (id: number) => {
    await prisma.category.delete({
        where: {
            id
        }
    })
    revalidatePath("/home/category");
    redirect("/home/category")
}

export const updateCategory = async (id: number, data: FormData) => {
    const name = data.get("name") as string;
    const content = data.get("content") as string;
    const description = data.get("description") as string; 
    const slug = data.get("slug") as string; 
    await prisma.category.update({ 
        where: {
            id,
        },
        data: {
            name,
            content,
            description,
            slug,
    }})
    revalidatePath("/home/category");
    redirect("/home/category");
}

