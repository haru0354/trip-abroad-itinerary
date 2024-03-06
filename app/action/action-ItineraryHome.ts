"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../components/lib/prisma";
import { z } from "zod";

type FormState = {
  message?: string | null;
  errors?: {
    startDate?: string[] | undefined;
    endDate?: string[] | undefined;
    name?: string[] | undefined;
    destination?: string[] | undefined;
  };
};

const schema = z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    name: z.string().min(1, { message: "タイトルの入力は必須です" }),
    destination: z.string().optional(),
});

export const addItineraryHome = async (state: FormState, data: FormData) => {
  const startDate = data.get("startDate") as string;
  const endDate = data.get("endDate") as string;
  const name = data.get("name") as string;
  const destination = data.get("destination") as string;
  const userId = data.get("userId") as string;

  const validatedFields = schema.safeParse({
    startDate,
    endDate,
    name,
    destination,
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
    await prisma.itineraryHome.create({
      data: {
        startDate,
        endDate,
        name,
        destination,
        user: { connect: { id: Number(userId) } },
      },
    });
    revalidatePath("/travel_brochure/home");
    return { message: "add" };
  } catch (error) {
    console.error("旅行を追加する際にエラーが発生しました:", error);
    return { message: "旅行を追加する際にエラーが発生しました" };
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
    console.error("メモの削除中にエラーが発生しました:", error);
    return { message: "メモの削除中にエラーが発生しました" };
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
  } catch (error) {
    console.error("メモを編集する際にエラーが発生しました:", error);
    return { message: "メモを編集する際にエラーが発生しました" };
  }
};
