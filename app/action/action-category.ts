"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../components/lib/prisma";
import { z } from "zod";

type FormState = {
    message: string | null;
    errors: {
      name?: string;
      slug?: string;
    };
  }

const schema = z.object({
    name: z.string().min(1, { message: "カテゴリ名の入力は必須です" }),
    slug: z
      .string()
      .min(1, { message: "スラッグの入力は必須です。" })
      .regex(/^[a-z0-9]+$/, {
        message: "スラッグは半角小文字の英数字で入力してください",
      }),
    content: z.string().optional(),
    description: z.string().optional(),
  });

export const addCategory = async (state: FormState, data: FormData) => {
    const name = data.get("name") as string;
    const slug = data.get("slug") as string;
    const content = data.get("content") as string;
    const description = data.get("description") as string;
  
    const validatedFields = schema.safeParse({
        name,
        slug,
        content,
        description,
      });

      if (!validatedFields.success) {
        const errors = {
            errors: validatedFields.error.flatten().fieldErrors,
        };
        console.log(errors)
        return errors;
    }

    try {
        await prisma.category.create({
            data: {
                name,
                slug,
                content,
                description,
            }
        });
        revalidatePath("/home/category");
        return { message: null };
    } catch (error) {
        console.error("カテゴリを追加する際にエラーが発生しました");
        return { message: "カテゴリを追加する際にエラーが発生しました" };
    }
}

export const deleteCategory = async (id: number) => {
    try {
        await prisma.category.delete({
            where: {
                id
            }
        });
    } catch (error) {
        console.error("カテゴリの削除中にエラーが発生しました:", error);
        return { message: "カテゴリの削除中にエラーが発生しました" };
    }
    redirect("/home/category"); 
};

export const updateCategory = async (id: number, state: FormState, data: FormData) => {
    const name = data.get("name") as string;
    const content = data.get("content") as string;
    const description = data.get("description") as string; 
    const slug = data.get("slug") as string; 

    const validatedFields = schema.safeParse({
        name,
        slug,
        content,
        description,
      });

      if (!validatedFields.success) {
        const errors = {
            errors: validatedFields.error.flatten().fieldErrors,
        };
        console.log(errors)
        return errors;
    }

    try {
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
    } catch (error) {
        console.error("カテゴリを編集する際にエラーが発生しました");
        return { message: "カテゴリを編集する際にエラーが発生しました" };
    }
    redirect("/home/category"); 
}

