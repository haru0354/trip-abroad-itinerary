"use server";

import prisma from "../components/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

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

export const deleteUser = async (id: number) => {
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("アカウントの削除中にエラーが発生しました:", error);
    return { message: "アカウントの削除中にエラーが発生しました" };
  }
  redirect(`/memorybook/`);
};

export const updateProfile = async (
  id: number,
  state: FormState,
  data: FormData
) => {
  const name = data.get("name") as string;
  const email = data.get("email") as string;
  const userId = data.get("userId") as string;

  const validatedFields = schema.safeParse({
    name,
    email,
  });

  if (!validatedFields.success) {
    const errors = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "failure",
    };
    console.log(errors);
    return errors;
  }

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });
    revalidatePath("/memorybook/home/profile");
    return { message: "edit" };
  } catch (error) {
    console.error("プロフィールを編集する際にエラーが発生しました:", error);
    return { message: "プロフィールを編集する際にエラーが発生しました" };
  }
};

export const updatePassword = async (
  id: number,
  state: FormState,
  data: FormData
) => {
  const password = data.get("password") as string;
  const passwordConfirmation = data.get("passwordConfirmation") as string;

  const validatedFields = passwordSchema.safeParse({
    password,
    passwordConfirmation,
  });

  if (!validatedFields.success) {
    const errors = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "failure",
    };
    console.log(errors);
    return errors;
  }

  if (password !== passwordConfirmation) {
    console.error("パスワードが一致しませんでした");
    return { message: "パスワードが一致しませんでした" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        hashedPassword,
      },
    });
    revalidatePath("/memorybook/home/profile");
    return { message: "edit" };
  } catch (error) {
    console.error("パスワードを編集する際にエラーが発生しました:", error);
    return { message: "パスワードを編集する際にエラーが発生しました" };
  }
};
