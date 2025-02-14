"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "@/app/lib/prisma";
import { validateTripOwner } from "../lib/validate/validateTripOwner";
import { validateSchema } from "../../../lib/validateSchema";

import { memoSchema } from "../schema/memoSchema";
import type { MemoFormState } from "../types/formState";
import { getCurrentUserId } from "@/app/lib/getCurrentUser";

export const addMemo = async (state: MemoFormState, data: FormData) => {
  const name = data.get("name") as string;
  const content = data.get("content") as string;
  const tripId = data.get("tripId") as string;

  if (!tripId) {
    console.error("旅行プランの指定が正しくありません");
    return { message: "メモの登録をやり直してください。" };
  }

  const idValidTripOwner = await validateTripOwner(tripId);

  if (!idValidTripOwner) {
    console.error("権限の確認に失敗しました");
    return { message: "権限のエラー。再度ログインのやり直しが必要です。" };
  }

  const validateDate = {
    name,
    content,
    tripId,
  };

  const validated = validateSchema(memoSchema, validateDate);

  if (!validated.success) {
    console.log(validated.errors);
    return { errors: validated.errors };
  }

  const userId = await getCurrentUserId();

  if (!userId) {
    console.error("認証がされていません。");
    return { message: "再度ログインのやり直しが必要です。" };
  }

  try {
    await prisma.memo.create({
      data: {
        name,
        content,
        trip: { connect: { id: Number(tripId) } },
        user: { connect: { id: userId } },
      },
    });
    revalidatePath(`/memorybook/${tripId}/memo`);
    return { message: "add" };
  } catch (error) {
    console.error("メモを追加する際にエラーが発生しました:", error);
    return { message: "メモを追加する際にエラーが発生しました" };
  }
};

export const deleteMemo = async (data: FormData) => {
  const memoId = data.get("id") as string;
  const tripId = data.get("tripId") as string;

  if (!tripId) {
    console.error("旅行プランの指定が正しくありません");
    return { message: "メモの削除をやり直してください。" };
  }

  const idValidTripOwner = await validateTripOwner(tripId);

  if (!idValidTripOwner) {
    console.error("権限の確認に失敗しました");
    return { message: "権限のエラー。再度ログインのやり直しが必要です。" };
  }

  try {
    await prisma.memo.delete({
      where: {
        id: Number(memoId),
      },
    });

    console.log("メモの削除に成功しました");
  } catch (error) {
    console.error("メモの削除中にエラーが発生しました:", error);
    return { message: "メモの削除中にエラーが発生しました" };
  }
  redirect(`/memorybook/${tripId}/memo`);
};

export const updateMemo = async (
  memoId: number,
  state: MemoFormState,
  data: FormData
) => {
  const name = data.get("name") as string;
  const content = data.get("content") as string;
  const tripId = data.get("tripId") as string;

  if (!tripId) {
    console.error("旅行プランの指定が正しくありません");
    return { message: "メモの編集をやり直してください。" };
  }

  const idValidTripOwner = await validateTripOwner(tripId);

  if (!idValidTripOwner) {
    console.error("権限の確認に失敗しました");
    return { message: "権限のエラー。再度ログインのやり直しが必要です。" };
  }

  const validateDate = {
    name,
    content,
    tripId,
  };

  const validated = validateSchema(memoSchema, validateDate);

  if (!validated.success) {
    console.log(validated.errors);
    return { errors: validated.errors };
  }

  try {
    await prisma.memo.update({
      where: {
        id: memoId,
      },
      data: {
        name,
        content,
      },
    });
    revalidatePath(`/memorybook/${tripId}/memo`);
    return { message: "edit" };
  } catch (error) {
    console.error("メモを編集する際にエラーが発生しました:", error);
    return { message: "メモを編集する際にエラーが発生しました" };
  }
};
