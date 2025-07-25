"use server";

import prisma from "@/app/lib/prisma";
import { checkUserRole } from "@/app/lib/checkUserRole";
import { validateSchema } from "@/app/lib/validateSchema";

import { dashboardMemoSchema } from "../schema/dashboardMemoSchema";
import type { DashboardFormState, DeleteFormState } from "../types/formState";

export const addDashboardMemo = async (
  state: DashboardFormState,
  data: FormData
) => {
  const isAdmin = await checkUserRole("admin");

  if (!isAdmin) {
    console.error("ダッシュボードメモ追加の権限が必要です。");
    return { message: "権限エラー。再度ログインをし直してください。" };
  }

  const name = data.get("name") as string;
  const content = data.get("content") as string;

  const validateDate = {
    name,
    content,
  };

  const validated = validateSchema(dashboardMemoSchema, validateDate);

  if (!validated.success) {
    console.error(validated.errors);
    return { errors: validated.errors };
  }

  try {
    await prisma.dashboardMemo.create({
      data: {
        name,
        content,
      },
    });

    return { message: "add" };
  } catch {
    console.error("メモを追加する際にエラーが発生しました");
    return { message: "メモを追加する際にエラーが発生しました" };
  }
};

export const deleteDashboardMemo = async (
  state: DeleteFormState,
  data: FormData
) => {
  const isAdmin = await checkUserRole("admin");

  if (!isAdmin) {
    console.error("ダッシュボードメモ削除の権限が必要です。");
    return { message: "権限エラー。再度ログインをし直してください。" };
  }

  const id = data.get("id") as string;

  try {
    await prisma.dashboardMemo.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("メモの削除中にエラーが発生しました:", error);
    return { message: "メモの削除中にエラーが発生しました" };
  }
  return { message: "success", redirectUrl: "/dashboard" };
};

export const updateDashboardMemo = async (
  id: string,
  state: DashboardFormState,
  data: FormData
) => {
  const isAdmin = await checkUserRole("admin");

  if (!isAdmin) {
    console.error("ダッシュボードメモ編集の権限が必要です。");
    return { message: "権限エラー。再度ログインをし直してください。" };
  }

  const name = data.get("name") as string;
  const content = data.get("content") as string;

  const validateDate = {
    name,
    content,
  };

  const validated = validateSchema(dashboardMemoSchema, validateDate);

  if (!validated.success) {
    console.error(validated.errors);
    return { errors: validated.errors };
  }

  try {
    await prisma.dashboardMemo.update({
      where: {
        id,
      },
      data: {
        name,
        content,
      },
    });

    return { message: "edit" };
  } catch {
    console.error("メモを編集する際にエラーが発生しました");
    return { message: "メモを編集する際にエラーが発生しました" };
  }
};
