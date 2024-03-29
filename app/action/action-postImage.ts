"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../components/lib/prisma";
import { z } from "zod";
import { promises as fsPromises } from "fs";
import { FileSaveUtils } from "../components/lib/FileSaveUtils";
import { validateFile } from "../components/lib/ValidateFile";
import { getPostImage } from "../components/lib/BlogServiceUnique";

const { unlink } = fsPromises;

type FormState = {
  message?: string | null;
  errors?: {
    image?: string[] | undefined;
    altText?: string[] | undefined;
  };
};

const schema = z.object({
  image: z.unknown().refine((value) => value instanceof File || !value, {
    message: "画像の選択は必須です",
  }),
  altText: z.string().min(1, { message: "画像の名前の入力は必須です。" }),
});

const updateSchema = z.object({
  altText: z.string().min(1, { message: "画像の名前の入力は必須です。" }),
});

export const addPostImage = async (state: FormState, data: FormData) => {
  const image = data.get("image") as File;
  const altText = data.get("altText") as string;
  const validatedFields = schema.safeParse({
    image,
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
    const isValidFile = await validateFile(image);

    if (!isValidFile) {
      const errors = {
        errors: {
          image: [
            "画像ファイルが無効です。有効な画像ファイルを選択してください。",
          ],
        },
      };
      console.log(errors);
      return errors;
    }

    const { fileUrl, fileName } = await FileSaveUtils(image);

    await prisma.postImage.create({
      data: {
        name: fileName,
        url: fileUrl,
        altText,
      },
    });
    revalidatePath(`/dashboard/image`);
    console.log("画像の追加に成功しました");
  } catch (error) {
    console.error("画像を追加する際にエラーが発生しました");
    return { message: "画像を追加する際にエラーが発生しました" };
  }
  redirect("/dashboard/image");
};

export const deletePostImage = async (data: FormData) => {
  const id = data.get("id") as string;

  try {
    const postImage = await getPostImage(id)

    if (!postImage) {
      console.error("指定した画像が見つかりませんでした。");
      return;
    }

    await prisma.postImage.delete({
      where: {
        id: Number(id),
      },
    });
    await unlink(`./public/postImage/${postImage?.name}`);
    revalidatePath(`/dashboard/image`);
  } catch (error) {
    console.error("画像の削除中にエラーが発生しました:", error);
    return { message: "画像の削除中にエラーが発生しました" };
  }
  redirect("/dashboard/image");
};

export const updatePostImage = async (
  id: number,
  state: FormState,
  data: FormData
) => {
  const image = data.get("image") as File;
  const altText = data.get("altText") as string;

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
  if (image && image.size > 0) {
    try {
      const stringNumber = id.toString();
      const postImage = await getPostImage(stringNumber)

      await unlink(`./public/postImage/${postImage?.name}`);
      const { fileUrl, fileName } = await FileSaveUtils(image);

      await prisma.postImage.update({
        where: {
          id,
        },
        data: {
          name: fileName,
          url: fileUrl,
        },
      });
      revalidatePath(`/dashboard/image/`);
    } catch (error) {
      console.error("画像を編集する際にエラーが発生しました");
      return { message: "画像を編集する際にエラーが発生しました" };
    }
  }
  redirect("/dashboard/image");
};
