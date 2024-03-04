"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../components/lib/prisma";
import { z } from "zod";

type FormState = {
  message?: string | null;
  errors?: {
    date?: string[] | undefined;
    time?: string[] | undefined;
    name?: string[] | undefined;
    content?: string[] | undefined;
    hideContent?: string[] | undefined;
    userId?: string[] | undefined;
  };
};

const schema = z.object({
  date: z.string().min(1, { message: "日付の入力は必須です" }),
  time: z.string().min(1, { message: "時間の入力は必須です" }),
  name: z.string().min(1, { message: "タイトルの入力は必須です" }),
  content: z.string().optional(),
  hideContent: z.string().optional(),
  userId: z.string().transform((val) => Number(val)),
});

export const addItinerary = async (state: FormState, data: FormData) => {
  const date = data.get("date") as string;
  const time = data.get("time") as string;
  const name = data.get("name") as string;
  const content = data.get("content") as string;
  const hideContent = data.get("hideContent") as string;
  const userId = data.get("userId") as string;

  const validatedFields = schema.safeParse({
    date,
    time,
    name,
    content,
    hideContent,
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
    await prisma.itinerary.create({
      data: {
        date,
        time,
        name,
        content,
        hideContent,
        user: { connect: { id: Number(userId) } },
      },
    });
    revalidatePath("/travel_brochure/itinerary");
    return { message: "add" };
  } catch (error) {
    console.error("旅程を追加する際にエラーが発生しました:", error);
    return { message: "旅程を追加する際にエラーが発生しました" };
  }
};

export const deleteItinerary = async (id: number) => {
  try {
    await prisma.itinerary.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("旅程の削除中にエラーが発生しました:", error);
    return { message: "旅程の削除中にエラーが発生しました" };
  }
  redirect("/travel_brochure/itinerary");
};

export const updateItinerary = async (id: number, state: FormState, data: FormData) => {
  const date = data.get("date") as string;
  const time = data.get("time") as string;
  const name = data.get("name") as string;
  const content = data.get("content") as string;
  const hideContent = data.get("hideContent") as string;
  const userId = data.get("userId") as string;

  const validatedFields = schema.safeParse({
    date,
    time,
    name,
    content,
    hideContent,
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
    await prisma.itinerary.update({
      where: {
        id,
      },
      data: {
        date,
        time,
        name,
        content,
        hideContent,
      },
    });
    revalidatePath("/travel_brochure/itinerary");
    return { message: "edit" };
  } catch (error) {
    console.error("旅程を編集する際にエラーが発生しました:", error);
    return { message: "旅程を編集する際にエラーが発生しました" };
  }
};

export const showContent = async (data: FormData) => {
  const id = data.get("id") as string;
  const isShowContent = data.get("isShowContent") === "false";
  await prisma.itinerary.update({
    where: {
      id: Number(id),
    },
    data: {
      isShowContent,
    },
  });
  revalidatePath("/travel_brochure/itinerary");
};
