"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../components/lib/prisma";
import { z } from "zod";

type FormState = {
  message?: string | null;
  errors?: {
    name?: string[] | undefined;
    content?: string[] | undefined;
    userId?: string[] | undefined;
  };
};

const schema = z.object({
  name: z.string().min(1, { message: "タイトルの入力は必須です" }),
  content: z.string().optional(),
  userId: z.string().transform((val) => Number(val)),
});

export const addMemo = async (state: FormState, data: FormData) => {
  const name = data.get("name") as string;
  const content = data.get("content") as string;
  const userId = data.get("userId") as string;

  const validatedFields = schema.safeParse({
    name,
    content,
    userId,
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
        user: { connect: { id: Number(userId) } },
      },
    });
    revalidatePath("/travel_brochure/memo");
    return { message: "add" };
  } catch {
    console.error("メモを追加する際にエラーが発生しました");
    return { message: "メモを追加する際にエラーが発生しました" };
  }
};

export const deleteMemo = async (id: number) => {
  try {
    await prisma.memo.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("カテゴリの削除中にエラーが発生しました:", error);
    return { message: "カテゴリの削除中にエラーが発生しました" };
  }
  redirect("/travel_brochure/memo");
};

export const updateMemo = async (id: number, state: FormState, data: FormData) => {
  const name = data.get("name") as string;
  const content = data.get("content") as string;
  const userId = data.get("userId") as string;

  const validatedFields = schema.safeParse({
    name,
    content,
    userId,
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
    revalidatePath("/travel_brochure/memo");
    return { message: "edit" };
  } catch {
    console.error("メモを編集する際にエラーが発生しました");
    return { message: "メモを編集する際にエラーが発生しました" };
  }
};
