"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "@/app/lib/prisma";
import { validateTripOwner } from "../lib/validate/validateTripOwner";
import { validateSchema } from "../../../lib/validateSchema";

type FormState = {
  message?: string | null;
  errors?: {
    name?: string[] | undefined;
    content?: string[] | undefined;
    tripId?: string[] | undefined;
  };
};

const schema = z.object({
  name: z.string().min(1, { message: "タイトルの入力は必須です" }),
  content: z.string().optional(),
  tripId: z.string().transform((val) => Number(val)),
});

export const addMemo = async (state: FormState, data: FormData) => {
  const name = data.get("name") as string;
  const content = data.get("content") as string;
  const tripId = data.get("tripId") as string;

  if (!tripId) {
    console.error("旅行プランの指定が正しくありません");
    return { message: "旅行プランの指定が正しくありません" };
  }

  const idValidTripOwner = await validateTripOwner(tripId);

  if (!idValidTripOwner) {
    return { message: "権限がありません" };
  }

  const validateDate = {
    name,
    content,
    tripId,
  };

  const validated = validateSchema(schema, validateDate);

  if (!validated.success) {
    if (validated.errors) {
      console.log(validated.errors);
      return validated.errors;
    } else {
      console.error("何らかのバリデーションエラーが発生しました");
    }
  }

  try {
    await prisma.memo.create({
      data: {
        name,
        content,
        trip: { connect: { id: Number(tripId) } },
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
    return { message: "旅行プランの指定が正しくありません" };
  }

  const idValidTripOwner = await validateTripOwner(tripId);

  if (!idValidTripOwner) {
    return { message: "権限がありません" };
  }

  try {
    await prisma.memo.delete({
      where: {
        id: Number(memoId),
      },
    });
  } catch (error) {
    console.error("メモの削除中にエラーが発生しました:", error);
    return { message: "メモの削除中にエラーが発生しました" };
  }
  redirect(`/memorybook/${tripId}/memo`);
};

export const updateMemo = async (
  memoId: number,
  state: FormState,
  data: FormData
) => {
  const name = data.get("name") as string;
  const content = data.get("content") as string;
  const tripId = data.get("tripId") as string;

  if (!tripId) {
    console.error("旅行プランの指定が正しくありません");
    return {};
  }

  const idValidTripOwner = await validateTripOwner(tripId);

  if (!idValidTripOwner) {
    console.error("権限の確認に失敗しました");
    return {};
  }

  const validateDate = {
    name,
    content,
    tripId,
  };

  const validated = validateSchema(schema, validateDate);

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
