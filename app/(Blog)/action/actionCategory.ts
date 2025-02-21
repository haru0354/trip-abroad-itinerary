"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "@/app/lib/prisma";
import { supabase } from "@/app/util/supabase";
import { getCategory } from "../lib/service/blogServiceUnique";
import { revalidatePostsAndCategories } from "@/app/(blog)/lib/revalidatePostsAndCategories";
import { checkUserRole } from "@/app/lib/checkUserRole";
import { validateSchema } from "@/app/lib/validateSchema";
import { fileSaveAndValidate } from "@/app/lib/image-file-save/fileSaveAndValidate";

import { categorySchema } from "../schema/categorySchema";
import type { CategoryFormState } from "../types/formState";

export const addCategory = async (state: CategoryFormState, data: FormData) => {
  const isAdmin = await checkUserRole("admin");

  if (!isAdmin) {
    console.error("カテゴリ追加の権限が必要です。");
    return { message: "権限エラー。再度ログインをし直してください。" };
  }

  const name = data.get("name") as string;
  const slug = data.get("slug") as string;
  const content = data.get("content") as string;
  const description = data.get("description") as string;
  const image = data.get("image") as File;
  const altText = data.get("altText") as string;
  const title = data.get("title") as string;

  const validateDate = {
    name,
    slug,
    content,
    description,
    title,
  };

  const validated = validateSchema(categorySchema, validateDate);

  if (!validated.success) {
    console.log(validated.errors);
    return { errors: validated.errors };
  }

  const CategoryData: any = {
    name,
    slug,
    content,
    description,
    title,
  };

  if (image && image.size > 0) {
    try {
      const result = await fileSaveAndValidate(image, altText);

      if (result.result) {
        const createdImage = await prisma.postImage.create({
          data: {
            name: result.fileName,
            url: result.fileUrl,
            altText,
          },
        });
        CategoryData.postImage = { connect: { id: createdImage.id } };
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
      console.error("画像の追加時にエラーが発生しました", error);
      return { message: "画像の追加時にエラーが発生しました" };
    }
  }

  try {
    await prisma.category.create({
      data: CategoryData,
    });
    revalidatePath(`/dashboard/category`);
    revalidatePath(`/dashboard/post/new-post`);

    if (image && image.size > 0) {
      revalidatePath(`/dashboard/image`);
    }
  } catch (error) {
    console.error("カテゴリを追加する際にエラーが発生しました");
    return { message: "カテゴリを追加する際にエラーが発生しました" };
  }
  redirect("/dashboard/category");
};

export const deleteCategory = async (data: FormData) => {
  const isAdmin = await checkUserRole("admin");

  if (!isAdmin) {
    console.error("カテゴリ削除の権限が必要です。");
    return { message: "権限エラー。再度ログインをし直してください。" };
  }

  const id = data.get("id") as string;

  const category = await getCategory("id", id, "postImage");

  if (category?.postImage?.url) {
    try {
      const fileName = category?.postImage?.name;
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
          id: category.postImage.id,
        },
      });
    } catch (error) {
      console.error(
        "関連する画像ライブラリの削除中にエラーが発生しました:",
        error
      );
      return {
        message: "関連する画像ライブラリの削除中にエラーが発生しました",
      };
    }
  }

  try {
    await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });

    revalidatePath(`/dashboard/category`);
    revalidatePath(`/dashboard/post/new-post`);
    await revalidatePostsAndCategories();

    if (category?.postImage?.url) {
      revalidatePath(`/dashboard/image`);
    }
  } catch (error) {
    console.error("カテゴリの削除中にエラーが発生しました:", error);
    return { message: "カテゴリの削除中にエラーが発生しました" };
  }
  redirect("/dashboard/category");
};

export const updateCategory = async (
  id: number,
  state: CategoryFormState,
  data: FormData
) => {
  const isAdmin = await checkUserRole("admin");

  if (!isAdmin) {
    console.error("カテゴリ編集の権限が必要です。");
    return { message: "権限エラー。再度ログインをし直してください。" };
  }

  const name = data.get("name") as string;
  const content = data.get("content") as string;
  const description = data.get("description") as string;
  const slug = data.get("slug") as string;
  const image = data.get("image") as File;
  const altText = data.get("altText") as string;
  const title = data.get("title") as string;

  const validateDate = {
    name,
    slug,
    content,
    description,
    title,
  };

  const validated = validateSchema(categorySchema, validateDate);

  if (!validated.success) {
    console.log(validated.errors);
    return { errors: validated.errors };
  }

  const CategoryData: any = {
    name,
    slug,
    content,
    description,
    title,
  };

  if (image && image.size > 0) {
    try {
      const result = await fileSaveAndValidate(image, altText);

      if (result.result) {
        const createdImage = await prisma.postImage.create({
          data: {
            name: result.fileName,
            url: result.fileUrl,
            altText,
          },
        });
        CategoryData.postImage = { connect: { id: createdImage.id } };
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
      console.error("画像の追加にエラーが発生しました。", error);
      return { message: "画像の追加時にエラーが発生しました。" };
    }

    const stringNumber = id.toString();
    const category = await getCategory("id", stringNumber, "postImage");

    if (category?.postImage?.url) {
      try {
        const fileName = category?.postImage?.name;
        const directory = "travel-memory-life";
        const saveFileUrl = `${directory}/${fileName}`;
        await supabase.storage.from("blog").remove([saveFileUrl]);
        console.log("画像の削除に成功しました");
      } catch (error) {
        console.error("画像の削除中にエラーが発生しました:", error);
        return { message: "画像の削除中にエラーが発生しました" };
      }
    }
  }

  try {
    await prisma.category.update({
      where: {
        id,
      },
      data: CategoryData,
    });

    revalidatePath(`/`);
    revalidatePath(`/dashboard/category`);
    revalidatePath(`/dashboard/post/new-post`);
    await revalidatePostsAndCategories();

    if (image && image.size > 0) {
      revalidatePath(`/dashboard/image`);
    }
  } catch (error) {
    console.error("カテゴリを編集する際にエラーが発生しました");
    return { message: "カテゴリを編集する際にエラーが発生しました" };
  }
  redirect("/dashboard/category");
};
