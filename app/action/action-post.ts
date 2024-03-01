"use server";

import { redirect } from "next/navigation";
import prisma from "../components/lib/prisma";
import { z } from "zod";
import { FileSaveUtils } from "../components/lib/FileSaveUtils";

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

const ImageSchema = z.object({
  altText: z.string().min(1, { message: "画像の追加時は名前の入力は必須です。" }),
});

export const addPost = async (state: FormState, data: FormData) => {
  const title = data.get("title") as string;
  const content = data.get("content") as string;
  const description = data.get("description") as string;
  const slug = data.get("slug") as string;
  const categoryId = data.get("categoryId") as string;
  const postImageId = data.get("postImageId") as File;
  const altText = data.get("altText") as string;

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

  const postData: any = {
    title,
    content,
    description,
    slug,
    category: { connect: { id: Number(categoryId) } },
  };

  try {
    if (postImageId) {
      const validatedFields = ImageSchema.safeParse({
        altText,
      });

      if (!validatedFields.success) {
        const errors = {
          errors: validatedFields.error.flatten().fieldErrors,
        };
        console.log(errors);
        return errors;
      }
    
      const { fileUrl, fileName } = await FileSaveUtils(postImageId);
      const createdImage = await prisma.postImage.create({
        data: {
          name: fileName,
          url: fileUrl,
          altText,
        },
      });
      postData.postImage = { connect: { id: createdImage.id } };
    }
    console.log("画像の追加に成功しました。");
  } catch (error) {
    console.error("画像の追加時にエラーが発生しました", error);
    return { message: "画像の追加時にエラーが発生しました" };
  }

  try {
    await prisma.post.create({
      data: postData,
    });
    console.log("記事の登録に成功しました。");
  } catch (error) {
    console.error("記事を投稿する際にエラーが発生しました", error);
    return { message: "記事を投稿する際にエラーが発生しました" };
  }
  redirect("/dashboard");
};

export const deletePost = async (id: number) => {
  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });
    console.log("記事が正常に削除されました。");
  } catch (error) {
    console.error("記事の削除中にエラーが発生しました:", error);
    return { message: "記事の削除中にエラーが発生しました" };
  }
  redirect("/dashboard");
};

export const updatePost = async (
  id: number,
  state: FormState,
  data: FormData
) => {
  const title = data.get("title") as string;
  const content = data.get("content") as string;
  const description = data.get("description") as string;
  const slug = data.get("slug") as string;
  const categoryId = data.get("categoryId") as string;
  const postImageId = data.get("postImageId") as File;
  const altText = data.get("altText") as string;

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

  const postData: any = {
    title,
    content,
    description,
    slug,
    category: { connect: { id: Number(categoryId) } },
  };

  if (postImageId) {
    try {
      const { fileUrl, fileName } = await FileSaveUtils(postImageId);
      const createdImage = await prisma.postImage.create({
        data: {
          name: fileName,
          url: fileUrl,
          altText,
        },
      });
      postData.postImage = { connect: { id: createdImage.id } };
      console.log("画像が正常に追加されました。");
    } catch (error) {
      console.log("画像の追加にエラーが発生しました。", error);
      return { message: "画像の追加時にエラーが発生しました。" };
    }
  }

  try {
    await prisma.post.update({
      where: {
        id,
      },
      data: postData,
    });
    console.log("記事が正常に編集されました。");
  } catch (error) {
    console.error("記事を編集する際にエラーが発生しました", error);
    return { message: "記事を編集する際にエラーが発生しました" };
  }
  redirect("/dashboard");
};
