"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "@/app/lib/prisma";
import { supabase } from "@/app/util/supabase";
import { getPost } from "../lib/service/blogServiceUnique";
import { fileSaveUtils } from "@/app/lib/image-file-save/fileSaveUtils";
import { validateFile } from "@/app/lib/validateFile";
import { revalidatePostsAndCategories } from "@/app/(blog)/lib/revalidatePostsAndCategories";
import { checkUserRole } from "@/app/lib/checkUserRole";

type FormState = {
  message?: string | null;
  errors?: {
    title?: string[] | undefined;
    content?: string[] | undefined;
    slug?: string[] | undefined;
    description?: string[] | undefined;
    categoryId?: string[] | undefined;
    image?: string[] | undefined;
  };
};

const schema = z.object({
  title: z.string().min(1, { message: "記事のタイトルの入力は必須です" }),
  content: z.string().min(1, { message: "記事の内容の入力は必須です" }),
  slug: z
    .string()
    .min(1, { message: "スラッグの入力は必須です。" })
    .regex(/^[a-z0-9-]+$/, {
      message: "スラッグは半角小文字の英数字で入力してください",
    }),
  description: z.string().min(1, { message: "記事の説明の入力は必須です" }),
  categoryId: z.string().transform((val) => Number(val)),
});

const ImageSchema = z.object({
  altText: z
    .string()
    .min(1, { message: "画像の追加時は名前の入力は必須です。" }),
});

export const addPost = async (state: FormState, data: FormData) => {
  const isAdmin = await checkUserRole("admin");

  if (!isAdmin) {
    console.error("記事の追加の権限が必要です。");
    return { message: "記事の追加の権限がありません。" };
  }

  const title = data.get("title") as string;
  const content = data.get("content") as string;
  const description = data.get("description") as string;
  const slug = data.get("slug") as string;
  const categoryId = data.get("categoryId") as string;
  const image = data.get("image") as File;
  const altText = data.get("altText") as string;
  const draft = data.get("draft") === "true";

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
    draft,
    category: { connect: { id: Number(categoryId) } },
  };

  if (image && image.size > 0) {
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

      const { fileUrl, fileName } = await fileSaveUtils(image);
      const createdImage = await prisma.postImage.create({
        data: {
          name: fileName,
          url: fileUrl,
          altText,
        },
      });
      postData.postImage = { connect: { id: createdImage.id } };

      console.log("画像の追加に成功しました。");
    } catch (error) {
      console.error("画像の追加時にエラーが発生しました", error);
      return { message: "画像の追加時にエラーが発生しました" };
    }
  }

  try {
    await prisma.post.create({
      data: postData,
    });
    revalidatePath(`/`);
    revalidatePath(`/dashboard/post`);
    await revalidatePostsAndCategories();

    console.log("記事の登録に成功しました。");
  } catch (error) {
    console.error("記事を投稿する際にエラーが発生しました", error);
    return { message: "記事を投稿する際にエラーが発生しました" };
  }
  redirect("/dashboard/post");
};

export const deletePost = async (data: FormData) => {
  const isAdmin = await checkUserRole("admin");

  if (!isAdmin) {
    console.error("記事の削除の権限が必要です。");
    return { message: "記事の削除の権限がありません。" };
  }

  const id = data.get("id") as string;

  const post = await getPost("id", id, "categoryAndPostImage");

  if (post?.postImage?.url) {
    try {
      const fileName = post?.postImage?.name;
      const directory = "travel-memory-life";
      const saveFileUrl = `${directory}/${fileName}`;
      await supabase.storage.from("blog").remove([saveFileUrl]);
      console.log("画像の削除に成功しました");
    } catch (error) {
      console.error("画像の削除中にエラーが発生しました:", error);
      return { message: "画像の削除中にエラーが発生しました" };
    }
  }

  try {
    await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
    revalidatePath(`/`);
    revalidatePath(`/dashboard/post`);
    revalidatePath(`/${post?.category.slug}/${post?.slug}`);
    await revalidatePostsAndCategories();

    if (post?.postImage?.url) {
      revalidatePath(`/dashboard/image`);
    }

    console.log("記事が正常に削除されました");
  } catch (error) {
    console.error("記事の削除中にエラーが発生しました:", error);
    return { message: "記事の削除中にエラーが発生しました" };
  }
  redirect("/dashboard/post");
};

export const updatePost = async (
  id: number,
  state: FormState,
  data: FormData
) => {
  const isAdmin = await checkUserRole("admin");

  if (!isAdmin) {
    console.error("記事の編集の権限が必要です。");
    return { message: "記事の編集の権限がありません。" };
  }

  const title = data.get("title") as string;
  const content = data.get("content") as string;
  const description = data.get("description") as string;
  const slug = data.get("slug") as string;
  const categoryId = data.get("categoryId") as string;
  const image = data.get("image") as File;
  const altText = data.get("altText") as string;
  const draft = data.get("draft") === "true";

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
    draft,
    category: { connect: { id: Number(categoryId) } },
  };

  if (image && image.size > 0) {
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

      const { fileUrl, fileName } = await fileSaveUtils(image);
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

    const stringNumber = id.toString();
    const post = await getPost("id", stringNumber, "categoryAndPostImage");

    if (post?.postImage?.url) {
      try {
        const fileName = post?.postImage?.name;
        const directory = "travel-memory-life";
        const saveFileUrl = `${directory}/${fileName}`;
        await supabase.storage.from("blog").remove([saveFileUrl]);
        console.log("登録していた画像の削除に成功しました");
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
        console.log("関連する画像ライブラリの削除に成功しました。");
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
    revalidatePath(`/`);
    revalidatePath(`/dashboard/post`);
    await revalidatePostsAndCategories();

    if (image && image.size > 0) {
      revalidatePath(`/dashboard/image`);
    }

    console.log("記事が正常に編集されました。");
  } catch (error) {
    console.error("記事を編集する際にエラーが発生しました", error);
    return { message: "記事を編集する際にエラーが発生しました" };
  }
  redirect("/dashboard/post");
};
