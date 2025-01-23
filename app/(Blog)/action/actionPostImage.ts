"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "@/app/lib/prisma";
import { supabase } from "@/app/util/supabase";
import { getPostImage } from "../lib/service/blogServiceUnique";
import { checkUserRole } from "@/app/lib/checkUserRole";
import { validateSchema } from "@/app/lib/validateSchema";
import { fileSaveAndValidate } from "@/app/lib/image-file-save/fileSaveAndValidate";

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
  const isAdmin = await checkUserRole("admin");

  if (!isAdmin) {
    console.error("画像追加の権限が必要です。");
    return {};
  }

  const image = data.get("image") as File;
  const altText = data.get("altText") as string;

  const validateDate = {
    image,
    altText,
  };

  const validated = validateSchema(schema, validateDate);

  if (!validated.success) {
    console.log(validated.errors);
    return { errors: validated.errors };
  }

  try {
    const result = await fileSaveAndValidate(image, altText);

    if (result.result) {
      await prisma.postImage.create({
        data: {
          name: result.fileName,
          url: result.fileUrl,
          altText,
        },
      });
      revalidatePath(`/dashboard/image`);
      console.log("画像の追加に成功しました");
    } else {
      if (result.errors) {
        console.error("画像のバリデーションエラー:", result.errors);
        return result.errors;
      } else if (result.message) {
        console.error("画像保存時にエラーが発生しました:", result.message);
        return result.message;
      }
    }
  } catch (error) {
    console.error("画像を追加する際にエラーが発生しました");
    return { message: "画像を追加する際にエラーが発生しました" };
  }
  redirect("/dashboard/image");
};

export const deletePostImage = async (data: FormData) => {
  const isAdmin = await checkUserRole("admin");

  if (!isAdmin) {
    console.error("画像削除の権限が必要です。");
    return {};
  }

  const id = data.get("id") as string;

  const postImage = await getPostImage(id);

  if (!postImage) {
    console.error("指定した画像が見つかりませんでした。");
    return {};
  }

  try {
    const fileName = postImage.name;
    const directory = "travel-memory-life";
    const saveFileUrl = `${directory}/${fileName}`;
    await supabase.storage.from("blog").remove([saveFileUrl]);
    console.log("画像の削除に成功しました");
  } catch (error) {
    console.error("画像の削除中にエラーが発生しました:", error);
    return { message: "画像の削除中にエラーが発生しました" };
  }

  try {
    await prisma.postImage.delete({
      where: {
        id: Number(id),
      },
    });
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
  const isAdmin = await checkUserRole("admin");

  if (!isAdmin) {
    console.error("画像編集の権限が必要です。");
    return {};
  }

  const image = data.get("image") as File;
  const altText = data.get("altText") as string;

  const validateDate = {
    altText,
  };

  const validated = validateSchema(updateSchema, validateDate);

  if (!validated.success) {
    console.log(validated.errors);
    return { errors: validated.errors };
  }

  // altTextのみが変更された場合は、altTextのみを更新
  if (!image && altText) {
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
    const stringNumber = id.toString();
    const postImage = await getPostImage(stringNumber);

    try {
      const fileName = postImage?.name;
      const directory = "travel-memory-life";
      const saveFileUrl = `${directory}/${fileName}`;
      await supabase.storage.from("blog").remove([saveFileUrl]);
      console.log("画像の削除に成功しました");
    } catch (error) {
      console.error("画像の削除中にエラーが発生しました:", error);
      return { message: "画像の削除中にエラーが発生しました" };
    }

    try {
      const result = await fileSaveAndValidate(image, altText);

      if (result.result) {
        await prisma.postImage.update({
          where: {
            id,
          },
          data: {
            name: result.fileName,
            url: result.fileUrl,
            altText,
          },
        });
        revalidatePath(`/dashboard/image`);
      } else {
        if (result.errors) {
          console.error("画像のバリデーションエラー:", result.errors);
          return result.errors;
        } else if (result.message) {
          console.error("画像保存時にエラーが発生しました:", result.message);
          return result.message;
        }
      }
    } catch (error) {
      console.error("画像を編集する際にエラーが発生しました");
      return { message: "画像を編集する際にエラーが発生しました" };
    }
  }
  redirect("/dashboard/image");
};
