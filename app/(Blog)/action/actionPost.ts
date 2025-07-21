"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "@/app/lib/prisma";
import { supabase } from "@/app/util/supabase";
import { getPost } from "../lib/service/blogServiceUnique";
import { revalidateSiteContents } from "@/app/(blog)/lib/revalidateSiteContents";
import { checkUserRole } from "@/app/lib/checkUserRole";
import { validateSchema } from "@/app/lib/validateSchema";
import { fileSaveAndValidate } from "@/app/lib/image-file-save/fileSaveAndValidate";

import { postSchema } from "../schema/postSchema";
import type { PostFormState } from "../types/formState";

export const addPost = async (state: PostFormState, data: FormData) => {
  const isAdmin = await checkUserRole("admin");

  if (!isAdmin) {
    console.error("記事の追加の権限が必要です。");
    return {};
  }

  const title = data.get("title") as string;
  const content = data.get("content") as string;
  const description = data.get("description") as string;
  const slug = data.get("slug") as string;
  const categoryId = data.get("categoryId") as string;
  const image = data.get("image") as File;
  const altText = data.get("altText") as string;
  const draft = data.get("draft") === "true";

  const validateDate = {
    title,
    content,
    description,
    slug,
    categoryId,
  };

  const validated = validateSchema(postSchema, validateDate);

  if (!validated.success) {
    console.error(validated.errors);
    return { errors: validated.errors };
  }

  const postData: any = {
    title,
    content,
    description,
    slug,
    draft,
    category: { connect: { id: categoryId } },
  };

  if (image && image.size > 0) {
    try {
      const result = await fileSaveAndValidate(image, altText);

      if (!result.result) {
        if (result.errors) {
          console.error("画像のバリデーションエラー:", result.errors);
          return { errors: result.errors };
        } else if (result.message) {
          console.error("画像保存時にエラーが発生しました:", result.message);
          return { message: result.message };
        }
      } else {
        const createdImage = await prisma.postImage.create({
          data: {
            name: result.fileName,
            url: result.fileUrl,
            altText,
          },
        });
        postData.postImage = { connect: { id: createdImage.id } };
      }
    } catch (error) {
      console.error("画像の追加時にエラーが発生しました", error);
      return { message: "画像の追加時にエラーが発生しました" };
    }
  }

  try {
    await prisma.post.create({
      data: postData,
    });

    await revalidateSiteContents();

    return { message: "add" };
  } catch (error) {
    console.error("記事を投稿する際にエラーが発生しました", error);
    return { message: "記事を投稿する際にエラーが発生しました" };
  }
};

export const deletePost = async (data: FormData) => {
  const isAdmin = await checkUserRole("admin");

  if (!isAdmin) {
    console.error("記事の削除の権限が必要です。");
    return { message: "権限エラー。再度ログインをし直してください。" };
  }

  const id = data.get("id") as string;

  const post = await getPost("id", id, "categoryAndPostImage");

  if (post?.postImage?.url) {
    try {
      const fileName = post?.postImage?.name;
      const directory = "travel-memory-life";
      const saveFileUrl = `${directory}/${fileName}`;
      await supabase.storage.from("blog").remove([saveFileUrl]);
    } catch (error) {
      console.error("画像の削除中にエラーが発生しました:", error);
      return { message: "画像の削除中にエラーが発生しました" };
    }
  }

  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });

    await revalidateSiteContents();

  } catch (error) {
    console.error("記事の削除中にエラーが発生しました:", error);
    return { message: "記事の削除中にエラーが発生しました" };
  }
  redirect("/dashboard/post");
};

export const updatePost = async (
  id: string,
  state: PostFormState,
  data: FormData
) => {
  const isAdmin = await checkUserRole("admin");

  if (!isAdmin) {
    console.error("記事の編集の権限が必要です。");
    return { message: "権限エラー。再度ログインをし直してください。" };
  }

  const title = data.get("title") as string;
  const content = data.get("content") as string;
  const description = data.get("description") as string;
  const slug = data.get("slug") as string;
  const categoryId = data.get("categoryId") as string;
  const image = data.get("image") as File;
  const altText = data.get("altText") as string;
  const draft = data.get("draft") === "true";

  const validateDate = {
    title,
    content,
    description,
    slug,
    categoryId,
  };

  const validated = validateSchema(postSchema, validateDate);

  if (!validated.success) {
    console.error(validated.errors);
    return { errors: validated.errors };
  }

  const postData: any = {
    title,
    content,
    description,
    slug,
    draft,
    category: { connect: { id: categoryId } },
  };

  if (image && image.size > 0) {
    try {
      const result = await fileSaveAndValidate(image, altText);

      if (!result.result) {
        if (result.errors) {
          console.error("画像のバリデーションエラー:", result.errors);
          return { errors: result.errors };
        } else if (result.message) {
          console.error("画像保存時にエラーが発生しました:", result.message);
          return { message: result.message };
        }
      } else {
        const createdImage = await prisma.postImage.create({
          data: {
            name: result.fileName,
            url: result.fileUrl,
            altText,
          },
        });
        postData.postImage = { connect: { id: createdImage.id } };
      }
    } catch (error) {
      console.error("画像の追加にエラーが発生しました。", error);
      return { message: "画像の追加時にエラーが発生しました。" };
    }

    const post = await getPost("id", id, "categoryAndPostImage");

    if (post?.postImage?.url) {
      try {
        const fileName = post?.postImage?.name;
        const directory = "travel-memory-life";
        const saveFileUrl = `${directory}/${fileName}`;
        await supabase.storage.from("blog").remove([saveFileUrl]);
      } catch (error) {
        console.error("登録していた画像の削除中にエラーが発生しました:", error);
        return { message: "登録していた画像の削除中にエラーが発生しました" };
      }

      try {
        await prisma.postImage.delete({
          where: {
            id: post.postImage.id,
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
  }

  try {
    await prisma.post.update({
      where: {
        id,
      },
      data: postData,
    });

    await revalidateSiteContents();

    return { message: "edit" };
  } catch (error) {
    console.error("記事を編集する際にエラーが発生しました", error);
    return { message: "記事を編集する際にエラーが発生しました" };
  }
};
