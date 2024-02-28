"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../components/lib/prisma";
import { writeFile } from "fs/promises";
import { join } from "path";
import { z } from "zod";
import { promises as fsPromises } from 'fs';

const { unlink } = fsPromises;

type FormState = {
  message?: string | null;
  errors?: {
    file?: string[] | undefined;
    altText?: string[] | undefined;
  };
};

const schema = z.object({
  file: z.unknown().refine((value) => value instanceof File, {
    message: "画像の選択は必須です",
  }),
  altText: z.string().min(1, { message: "画像の名前の入力は必須です。" }),
});

const updateSchema = z.object({
  altText: z.string().min(1, { message: "画像の名前の入力は必須です。" }),
});

export const addPostImage = async (state: FormState, data: FormData) => {
  const file = data.get("file") as File;
  const altText = data.get("altText") as string;

  const validatedFields = schema.safeParse({
    file,
    altText,
  });

  if (!validatedFields.success) {
    const errors = {
      errors: validatedFields.error.flatten().fieldErrors,
    };
    console.log(errors);
    return errors;
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}_${file.name}`;

    const path = join("./", "public", "postImage", fileName);
    await writeFile(path, buffer);
    const fileUrl = `/postImage/${fileName}`;

    await prisma.postImage.create({
      data: {
        name: fileName,
        url: fileUrl,
        altText,
      },
    });
  } catch (error) {
    console.error("画像を追加する際にエラーが発生しました");
    return { message: "画像を追加する際にエラーが発生しました" };
  }
  redirect("/home/image");
};

export const deletePostImage = async (id: number) => {
  try {
    const postImage = await prisma.postImage.findUnique({
      where: {
        id,
      },
    });

    if (!postImage) {
      throw new Error('指定された画像が見つかりませんでした');
    }

    await prisma.postImage.delete({
      where: {
        id,
      },
    });

    await unlink(`./public/postImage/${postImage.name}`);

  } catch (error) {
    console.error("画像の削除中にエラーが発生しました:", error);
    return { message: "画像の削除中にエラーが発生しました" };
  }
  redirect("/home/image");
};

export const updatePostImage = async (
  id: number,
  state: FormState,
  data: FormData
) => {
  const file = data.get("file") as File;
  const altText = data.get("altText") as string;
  console.log("data:", data);

  const validatedFields = updateSchema.safeParse({
    altText,
  });

  if (!validatedFields.success) {
    const errors = {
      errors: validatedFields.error.flatten().fieldErrors,
    };
    console.log(errors);
    return errors;
  }

  // altTextのみが変更された場合は、altTextを更新するだけ
  if (altText) {
    try {
      await prisma.postImage.update({
        where: {
          id,
        },
        data: {
          altText,
        },
      });
    } catch (error) {
      console.error("altTextを更新する際にエラーが発生しました");
      return { message: "altTextを更新する際にエラーが発生しました" };
    }
  }

  // 画像がある場合は保存してfileUrlを変更
  if (file) {
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}_${file.name}`;

      const path = join("./", "public", "postImage", fileName);
      await writeFile(path, buffer);

      const fileUrl = `/postImage/${fileName}`;

      await prisma.postImage.update({
        where: {
          id,
        },
        data: {
          url: fileUrl,
        },
      });
    } catch (error) {
      console.error("画像を編集する際にエラーが発生しました");
      return { message: "画像を編集する際にエラーが発生しました" };
    }
  }
  redirect("/home/image");
};
