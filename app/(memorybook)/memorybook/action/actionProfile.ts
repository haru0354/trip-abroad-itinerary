"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

import { getCurrentUserId } from "@/app/lib/getCurrentUser";
import { validateSchema } from "../../../lib/validateSchema";
import {
  changeEmailSchema,
  createAccountSchema,
  deleteUserSchema,
  passwordSchema,
  profileSchema,
} from "../schema/userSchema";
import prisma from "@/app/lib/prisma";

import type {
  ChangeEmailState,
  DeleteUserState,
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

    console.log("アカウントの作成に成功しました。");
    return { message: "success", user: { name, email, password } };
  } catch (error) {
    console.error("アカウントの作成中にエラーが発生しました:", error);
    return { message: "アカウントの作成中にエラーが発生しました" };
  }
};

export const deleteUser = async (state: DeleteUserState, data: FormData) => {
  const userId = await getCurrentUserId();

  if (!userId) {
    console.error("認証がされていません。");
    return { message: "再度ログインのやり直しが必要です。" };
  }

  const password = data.get("password") as string;
  const passwordConfirmation = data.get("passwordConfirmation") as string;

  const validateDate = {
    password,
    passwordConfirmation,
  };

  const validated = validateSchema(deleteUserSchema, validateDate);

  if (!validated.success) {
    console.log(validated.errors);
    return { errors: validated.errors };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    console.error("ユーザーが見つかりませんでした。");
    return {
      message:
        "ユーザーデータの確認に失敗しました。再度ログインのやり直しが必要です。",
    };
  }

  if (!user.hashedPassword) {
    console.error("パスワードが登録されていません。");
    return { message: "パスワードが登録されていません。" };
  }

  const isPasswordValid = user.hashedPassword
    ? await bcrypt.compare(password, user.hashedPassword)
    : false;

  if (!isPasswordValid) {
    console.error("パスワードが正しくありません。");
    return { message: "パスワードが正しくありません。" };
  }

  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return { message: "success" };
  } catch (error) {
    console.error("アカウントの削除中にエラーが発生しました:", error);
    return { message: "アカウントの削除中にエラーが発生しました" };
  }
};

export const updateEmail = async (state: ChangeEmailState, data: FormData) => {
  const userId = await getCurrentUserId();

  if (!userId) {
    console.error("認証がされていません。");
    return { message: "再度ログインのやり直しが必要です。" };
  }

  const email = data.get("email") as string;
  const emailConfirmation = data.get("emailConfirmation") as string;
  const password = data.get("password") as string;

  const validateDate = {
    email,
    emailConfirmation,
    password,
  };

  const validated = validateSchema(changeEmailSchema, validateDate);

  if (!validated.success) {
    console.log(validated.errors);
    return { errors: validated.errors };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    console.error("ユーザーが見つかりませんでした。");
    return {
      message:
        "ユーザーデータの確認に失敗しました。再度ログインのやり直しが必要です。",
    };
  }

  if (!user.hashedPassword) {
    console.error("パスワードが登録されていません。");
    return { message: "パスワードが登録されていません。" };
  }

  const isPasswordValid = user.hashedPassword
    ? await bcrypt.compare(password, user.hashedPassword)
    : false;

  if (!isPasswordValid) {
    console.error("パスワードが正しくありません。");
    return { message: "パスワードが正しくありません。" };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
      },
    });

    return { message: "success" };
  } catch (error) {
    console.error("メールアドレスを編集する際にエラーが発生しました:", error);
    return { message: "メールアドレスを編集する際にエラーが発生しました" };
  }
};

export const updatePassword = async (
  state: PasswordFormState,
  data: FormData
) => {
  const userId = await getCurrentUserId();

  if (!userId) {
    console.error("認証がされていません。");
    return { message: "再度ログインのやり直しが必要です。" };
  }

  const password = data.get("password") as string;
  const newPassword = data.get("newPassword") as string;
  const passwordConfirmation = data.get("passwordConfirmation") as string;

  const validateDate = {
    password,
    newPassword,
    passwordConfirmation,
  };

  const validated = validateSchema(passwordSchema, validateDate);

  if (!validated.success) {
    console.log(validated.errors);
    return { errors: validated.errors };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    console.error("ユーザーが見つかりませんでした。");
    return {
      message:
        "ユーザーデータの確認に失敗しました。再度ログインのやり直しが必要です。",
    };
  }

  if (!user.hashedPassword) {
    console.error("パスワードが登録されていません。");
    return { message: "パスワードが登録されていません。" };
  }

  const isPasswordValid = user.hashedPassword
    ? await bcrypt.compare(password, user.hashedPassword)
    : false;

  if (!isPasswordValid) {
    console.error("パスワードが正しくありません。");
    return { message: "パスワードが正しくありません。" };
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 12);

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedPassword: hashedNewPassword,
      },
    });

    return { message: "success" };
  } catch (error) {
    console.error("パスワードを編集する際にエラーが発生しました:", error);
    return { message: "パスワードを編集する際にエラーが発生しました" };
  }
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
