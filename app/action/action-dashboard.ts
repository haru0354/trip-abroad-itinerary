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
  };
};

const schema = z.object({
  name: z.string().min(1, { message: "タイトルの入力は必須です" }),
  content: z.string().optional(),
});

export const addDashboardMemo = async (state: FormState, data: FormData) => {
  const name = data.get("name") as string;
  const content = data.get("content") as string;

  const validatedFields = schema.safeParse({
    name,
    content,
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
    await prisma.dashboardMemo.create({
      data: {
        name,
        content,
      },
    });
    revalidatePath("/dashboard/");
    return { message: "add" };
  } catch {
    console.error("メモを追加する際にエラーが発生しました");
    return { message: "メモを追加する際にエラーが発生しました" };
  }
};

export const deleteDashboardMemo = async (data: FormData) => {
  const id = data.get("id") as string;

  try {
    await prisma.dashboardMemo.delete({
      where: {
        id: Number(id),
      },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("メモの削除中にエラーが発生しました:", error);
    return { message: "メモの削除中にエラーが発生しました" };
  }
  redirect("/dashboard");
};

export const updateDashboardMemo = async (id: number, state: FormState, data: FormData) => {
  const name = data.get("name") as string;
  const content = data.get("content") as string;

  const validatedFields = schema.safeParse({
    name,
    content,
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
    await prisma.dashboardMemo.update({
      where: {
        id,
      },
      data: {
        name,
        content,
      },
    });
    revalidatePath("/dashboard");
    return { message: "edit" };
  } catch {
    console.error("メモを編集する際にエラーが発生しました");
    return { message: "メモを編集する際にエラーが発生しました" };
  }
};
