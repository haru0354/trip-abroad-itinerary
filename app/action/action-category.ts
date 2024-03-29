"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../components/lib/prisma";
import { z } from "zod";
import { FileSaveUtils } from "../components/lib/FileSaveUtils";
import { validateFile } from "../components/lib/ValidateFile";
import { revalidatePostsAndCategories } from "../components/lib/revalidatePostsAndCategories";
import { getCategory } from "../components/lib/BlogServiceUnique";

type FormState = {
  message?: string | null;
  errors?: {
    name?: string[] | undefined;
    slug?: string[] | undefined;
    image?: string[] | undefined;
  };
};

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
  title: z.string().optional(),
});

const ImageSchema = z.object({
  altText: z
    .string()
    .min(1, { message: "画像の追加時は名前の入力は必須です。" }),
});

export const addCategory = async (state: FormState, data: FormData) => {
  const name = data.get("name") as string;
  const slug = data.get("slug") as string;
  const content = data.get("content") as string;
  const description = data.get("description") as string;
  const image = data.get("image") as File;
  const altText = data.get("altText") as string;
  const title = data.get("title") as string;

  const validatedFields = schema.safeParse({
    name,
    slug,
    content,
    description,
    title,
  });

  if (!validatedFields.success) {
    const errors = {
      errors: validatedFields.error.flatten().fieldErrors,
    };
    console.log(errors);
    return errors;
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

      const { fileUrl, fileName } = await FileSaveUtils(image);
      const createdImage = await prisma.postImage.create({
        data: {
          name: fileName,
          url: fileUrl,
          altText,
        },
      });
      CategoryData.postImage = { connect: { id: createdImage.id } };

      console.log("画像の追加に成功しました。");
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
    console.log("カテゴリの登録に成功しました。");
  } catch (error) {
    console.error("カテゴリを追加する際にエラーが発生しました");
    return { message: "カテゴリを追加する際にエラーが発生しました" };
  }
  redirect("/dashboard/category");
};

export const deleteCategory = async (data: FormData) => {
  const id = data.get("id") as string;

  const category = await getCategory("id", id);

  try {
    await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });
    revalidatePath(`/dashboard/category`);
    revalidatePath(`/dashboard/post/new-post`);
    revalidatePath(`/${category?.slug}`);
    console.log("カテゴリが正常に削除されました。");
  } catch (error) {
    console.error("カテゴリの削除中にエラーが発生しました:", error);
    return { message: "カテゴリの削除中にエラーが発生しました" };
  }
  redirect("/dashboard/category");
};

export const updateCategory = async (
  id: number,
  state: FormState,
  data: FormData
) => {
  const name = data.get("name") as string;
  const content = data.get("content") as string;
  const description = data.get("description") as string;
  const slug = data.get("slug") as string;
  const image = data.get("image") as File;
  const altText = data.get("altText") as string;
  const title = data.get("title") as string;

  const validatedFields = schema.safeParse({
    name,
    slug,
    content,
    description,
    title,
  });

  if (!validatedFields.success) {
    const errors = {
      errors: validatedFields.error.flatten().fieldErrors,
    };
    console.log(errors);
    return errors;
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

      const { fileUrl, fileName } = await FileSaveUtils(image);

      const createdImage = await prisma.postImage.create({
        data: {
          name: fileName,
          url: fileUrl,
          altText,
        },
      });
      CategoryData.postImage = { connect: { id: createdImage.id } };
      console.log("画像が正常に追加されました。");
    } catch (error) {
      console.log("画像の追加にエラーが発生しました。", error);
      return { message: "画像の追加時にエラーが発生しました。" };
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

    console.log("カテゴリが正常に編集されました。");
  } catch (error) {
    console.error("カテゴリを編集する際にエラーが発生しました");
    return { message: "カテゴリを編集する際にエラーが発生しました" };
  }
  redirect("/dashboard/category");
};
