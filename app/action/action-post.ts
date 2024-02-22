"use server";

import { redirect } from "next/navigation";
import prisma from "../components/lib/prisma";
import { z } from "zod";

type FormState = {
  message?: string | null;
  errors?: {
    title?: string[] | undefined;
    content?: string[] | undefined;
    slug?: string[] | undefined;
    description?: string[] | undefined;
    categoryId?: string[] | undefined;
  };
};

const schema = z.object({
  title: z.string().min(1, { message: "記事のタイトルの入力は必須です" }),
  content: z.string().min(1, { message: "記事の内容の入力は必須です" }),
  slug: z
    .string()
    .min(1, { message: "スラッグの入力は必須です。" })
    .regex(/^[a-z0-9]+$/, {
      message: "スラッグは半角小文字の英数字で入力してください",
    }),
  description: z.string().min(1, { message: "記事の説明の入力は必須です" }),
  categoryId: z.string().transform((val) => Number(val)),
});

export const addPost = async (state: FormState, data: FormData) => {
  const title = data.get("title") as string;
  const content = data.get("content") as string;
  const description = data.get("description") as string;
  const slug = data.get("slug") as string;
  const categoryId = data.get("categoryId") as string;

  const validatedFields = schema.safeParse({
    title,
    content,
    description,
    slug,
    categoryId,
  });

  if (!validatedFields.success) {
    const errors = {
      errors: validatedFields.error.flatten().fieldErrors,
    };
    console.log(errors);
    return errors;
  }

  try {
    await prisma.post.create({
      data: {
        title,
        content,
        description,
        slug,
        category: { connect: { id: Number(categoryId) } },
      },
    });
  } catch (error) {
    console.error("記事を投稿する際にエラーが発生しました");
    return { message: "記事を投稿する際にエラーが発生しました" };
  }
  redirect("/home");
};

export const deletePost = async (id: number) => {
  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("記事の削除中にエラーが発生しました:", error);
    return { message: "記事の削除中にエラーが発生しました" };
  }
  redirect("/home");
};

export const updatePost = async (id: number, state: FormState, data: FormData) => {
  const title = data.get("title") as string;
  const content = data.get("content") as string;
  const description = data.get("description") as string;
  const slug = data.get("slug") as string;
  const categoryId = data.get("categoryId") as string;

  const validatedFields = schema.safeParse({
    title,
    content,
    description,
    slug,
    categoryId,
  });

  if (!validatedFields.success) {
    const errors = {
      errors: validatedFields.error.flatten().fieldErrors,
    };
    console.log(errors);
    return errors;
  }

  try {
    await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        description,
        slug,
        category: { connect: { id: Number(categoryId) } },
      },
    });
  } catch (error) {
    console.error("記事を投稿する際にエラーが発生しました");
    return { message: "記事を投稿する際にエラーが発生しました" };
  }
  redirect("/home");
};