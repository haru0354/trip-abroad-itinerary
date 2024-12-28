"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "../../components/lib/prisma";

type FormState = {
  message?: string | null;
  errors?: {
    name?: string[] | undefined;
    content?: string[] | undefined;
    itineraryHomeId?: string[] | undefined;
  };
};

const schema = z.object({
  name: z.string().min(1, { message: "タイトルの入力は必須です" }),
  content: z.string().optional(),
  itineraryHomeId: z.string().transform((val) => Number(val)),
});

export const addMemo = async (state: FormState, data: FormData) => {
  const name = data.get("name") as string;
  const content = data.get("content") as string;
  const itineraryHomeId = data.get("itineraryHomeId") as string;

  const validatedFields = schema.safeParse({
    name,
    content,
    itineraryHomeId,
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
    await prisma.memo.create({
      data: {
        name,
        content,
        itineraryHome: { connect: { id: Number(itineraryHomeId) } },
      },
    });
    revalidatePath(`/memorybook/${itineraryHomeId}/memo`);
    return { message: "add" };
  } catch (error) {
    console.error("メモを追加する際にエラーが発生しました:", error);
    return { message: "メモを追加する際にエラーが発生しました" };
  }
};

export const deleteMemo = async (data: FormData) => {
  const itineraryHomeId = data.get("itineraryHomeId") as string;
  const id = data.get("id") as string;

  try {
    await prisma.memo.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.error("メモの削除中にエラーが発生しました:", error);
    return { message: "メモの削除中にエラーが発生しました" };
  }
  redirect(`/memorybook/${itineraryHomeId}/memo`);
};

export const updateMemo = async (
  id: number,
  state: FormState,
  data: FormData
) => {
  const name = data.get("name") as string;
  const content = data.get("content") as string;
  const itineraryHomeId = data.get("itineraryHomeId") as string;

  const validatedFields = schema.safeParse({
    name,
    content,
    itineraryHomeId,
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
    await prisma.memo.update({
      where: {
        id,
      },
      data: {
        name,
        content,
      },
    });
    revalidatePath(`/memorybook/${itineraryHomeId}/memo`);
    return { message: "edit" };
  } catch (error) {
    console.error("メモを編集する際にエラーが発生しました:", error);
    return { message: "メモを編集する際にエラーが発生しました" };
  }
};
