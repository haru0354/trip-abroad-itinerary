"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

import prisma from "@/app/lib/prisma";
import { getCurrentUserId } from "@/app/lib/getCurrentUser";
import { validateSchema } from "../../../lib/validateSchema";

import {
  createAccountSchema,
  passwordSchema,
  profileSchema,
} from "../schema/userSchema";
import type {
  PasswordFormState,
  ProfileFormState,
  SignupFormState,
} from "../types/formState";

export const createUser = async (state: SignupFormState, data: FormData) => {
  const name = data.get("name") as string;
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const role = "itineraryUser";

  const hashedPassword = await bcrypt.hash(password, 12);

  const validateDate = {
    name,
    email,
    password,
  };

  const validated = validateSchema(createAccountSchema, validateDate);

  if (!validated.success) {
    console.log(validated.errors);
    return { errors: validated.errors };
  }

  try {
    await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        role,
      },
    });

    const formData = {
      name,
      email,
      password,
    };

    console.log("アカウントの作成に成功しました。");
    return { message: "success", user: { name, email, password } };
  } catch (error) {
    console.error("アカウントの作成中にエラーが発生しました:", error);
    return { message: "アカウントの作成中にエラーが発生しました" };
  }
};

export const deleteUser = async () => {
  const userId = await getCurrentUserId();

  if (!userId) {
    console.error("認証がされていません。");
    return { message: "再度ログインのやり直しが必要です。" };
  }

  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    console.log("アカウントの削除に成功しました。");
  } catch (error) {
    console.error("アカウントの削除中にエラーが発生しました:", error);
    return { message: "アカウントの削除中にエラーが発生しました" };
  }
  redirect(`/memorybook/`);
};

export const updateProfile = async (
  state: ProfileFormState,
  data: FormData
) => {
  const name = data.get("name") as string;
  const email = data.get("email") as string;
  const userId = await getCurrentUserId();

  if (!userId) {
    console.error("認証がされていません。");
    return { message: "再度ログインのやり直しが必要です。" };
  }

  const validateDate = {
    name,
    email,
  };

  const validated = validateSchema(profileSchema, validateDate);

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

export const updatePassword = async (
  state: PasswordFormState,
  data: FormData
) => {
  const password = data.get("password") as string;
  const passwordConfirmation = data.get("passwordConfirmation") as string;

  const userId = await getCurrentUserId();

  if (!userId) {
    console.error("認証がされていません。");
    return { message: "再度ログインのやり直しが必要です。" };
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
