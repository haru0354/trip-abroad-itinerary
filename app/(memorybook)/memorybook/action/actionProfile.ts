"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";
import { getCurrentUserId } from "@/app/lib/getCurrentUser";
import { validateSchema } from "../../../lib/validateSchema";

type FormState = {
  message?: string | null;
  errors?: {
    name?: string[] | undefined;
    email?: string[] | undefined;
    password?: string[] | undefined;
    passwordConfirmation?: string[] | undefined;
  };
};

const schema = z.object({
  name: z.string().min(2, { message: "2文字以上入力する必要があります。" }),
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
});

const passwordSchema = z.object({
  password: z.string().min(6, { message: "6文字以上入力する必要があります。" }),
  passwordConfirmation: z
    .string()
    .min(6, { message: "6文字以上入力する必要があります。" }),
});

export const deleteUser = async () => {
  const userId = await getCurrentUserId();

  if (!userId) {
    console.error("認証がされていません。");
    return { message: "認証がされていません。" };
  }

  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.error("アカウントの削除中にエラーが発生しました:", error);
    return { message: "アカウントの削除中にエラーが発生しました" };
  }
  redirect(`/memorybook/`);
};

export const updateProfile = async (state: FormState, data: FormData) => {
  const name = data.get("name") as string;
  const email = data.get("email") as string;
  const userId = await getCurrentUserId();

  if (!userId) {
    console.error("認証がされていません。");
    return {};
  }

  const validateDate = {
    name,
    email,
  };

  const validated = validateSchema(schema, validateDate);

  if (!validated.success) {
    console.log(validated.errors);
    return { errors: validated.errors };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
      },
    });
    revalidatePath("/memorybook/dashboard/profile");
    return { message: "edit" };
  } catch (error) {
    console.error("プロフィールを編集する際にエラーが発生しました:", error);
    return { message: "プロフィールを編集する際にエラーが発生しました" };
  }
};

export const updatePassword = async (state: FormState, data: FormData) => {
  const password = data.get("password") as string;
  const passwordConfirmation = data.get("passwordConfirmation") as string;

  const userId = await getCurrentUserId();

  if (!userId) {
    console.error("認証がされていません。");
    return {};
  }

  const validateDate = {
    password,
    passwordConfirmation,
  };

  const validated = validateSchema(passwordSchema, validateDate);

  if (!validated.success) {
    console.log(validated.errors);
    return { errors: validated.errors };
  }

  if (password !== passwordConfirmation) {
    console.error("パスワードが一致しませんでした");
    return { message: "パスワードが一致しませんでした" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedPassword,
      },
    });
    revalidatePath("/memorybook/dashboard/profile");
    return { message: "edit" };
  } catch (error) {
    console.error("パスワードを編集する際にエラーが発生しました:", error);
    return { message: "パスワードを編集する際にエラーが発生しました" };
  }
};
