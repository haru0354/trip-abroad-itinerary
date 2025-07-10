"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "@/app/lib/prisma";
import { supabase } from "@/app/util/supabase";
import { getPostImage } from "../lib/service/blogServiceUnique";
import { checkUserRole } from "@/app/lib/checkUserRole";
import { validateSchema } from "@/app/lib/validateSchema";
import { fileSaveAndValidate } from "@/app/lib/image-file-save/fileSaveAndValidate";

import { imageSchema, updateImageSchema } from "../schema/imageSchema";
import type { ImageFormState } from "../types/formState";

export const addPostImage = async (state: ImageFormState, data: FormData) => {
  const isAdmin = await checkUserRole("admin");

  if (!isAdmin) {
    console.error("画像追加の権限が必要です。");
    return { message: "権限エラー。再度ログインをし直してください。" };
  }

  const image = data.get("image") as File;
  const altText = data.get("altText") as string;

  const validateDate = {
    image,
    altText,
  };

  const validated = validateSchema(imageSchema, validateDate);

  if (!validated.success) {
    console.error(validated.errors);
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

      return { message: "add" };
    } else {
      if (result.errors) {
        console.error("画像のバリデーションエラー:", result.errors);
        return { errors: result.errors };
      } else if (result.message) {
        console.error("画像保存時にエラーが発生しました:", result.message);
        return { message: result.message };
      }
    }
  } catch (error) {
    console.error("画像を追加する際にエラーが発生しました");
    return { message: "画像を追加する際にエラーが発生しました" };
  }
  
  return { message: "処理が完了しました", errors: {} };
};

export const deletePostImage = async (data: FormData) => {
  const isAdmin = await checkUserRole("admin");

  if (!isAdmin) {
    console.error("画像削除の権限が必要です。");
    return { message: "権限エラー。再度ログインをし直してください。" };
  }

  const id = data.get("id") as string;

  const postImage = await getPostImage(id);

  if (!postImage) {
    console.error("指定した画像が見つかりませんでした。");
    return { message: "指定した画像が見つかりませんでした。" };
  }

  try {
    const fileName = postImage.name;
    const directory = "travel-memory-life";
    const saveFileUrl = `${directory}/${fileName}`;
    await supabase.storage.from("blog").remove([saveFileUrl]);
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
  state: ImageFormState,
  data: FormData
) => {
  const isAdmin = await checkUserRole("admin");

  if (!isAdmin) {
    console.error("画像編集の権限が必要です。");
    return { message: "権限エラー。再度ログインをし直してください。" };
  }

  const image = data.get("image") as File;
  const altText = data.get("altText") as string;

  const validateDate = {
    altText,
  };

  const validated = validateSchema(updateImageSchema, validateDate);

  if (!validated.success) {
    console.error(validated.errors);
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

      return { message: "edit" };
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

        return { message: "edit" };
      } else {
        if (result.errors) {
          console.error("画像のバリデーションエラー:", result.errors);
          return { errors: result.errors };
        } else if (result.message) {
          console.error("画像保存時にエラーが発生しました:", result.message);
          return { message: result.message };
        }
      }
    } catch (error) {
      console.error("画像を編集する際にエラーが発生しました");
      return { message: "画像を編集する際にエラーが発生しました" };
    }
  }

  return { message: "処理が完了しました", errors: {} };
};
