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
  name: z.string().min(1, { message: "タイトルの入力は必須です" }).max(36, { message: "文字数は最大で36文字です" }),
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
    const createdItineraryHome = await prisma.itineraryHome.create({
      data: {
        startDate,
        endDate,
        name,
        destination,
        user: { connect: { id: Number(userId) } },
      },
    });
    const createdItineraryHomeId = createdItineraryHome.id;
    revalidatePath("/memorybook/home");
    return { message: "add", createdItineraryHomeId: createdItineraryHomeId };
  } catch (error) {
    console.error("旅行を追加する際にエラーが発生しました:", error);
    return { message: "旅行を追加する際にエラーが発生しました" };
  }
};

export const deleteItineraryHome = async (id: number) => {
  try {
    await prisma.itineraryHome.delete({
      where: {
        id,
      },
    });
    console.log("旅行の削除をしました。");
  } catch (error) {
    console.error("旅行の削除中にエラーが発生しました:", error);
    return { message: "旅行の削除中にエラーが発生しました" };
  }
  redirect("/memorybook/home");
};

export const updateItineraryHome = async (
  id: number,
  state: FormState,
  data: FormData
) => {
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
    await prisma.itineraryHome.update({
      where: {
        id,
      },
      data: {
        startDate,
        endDate,
        name,
        destination,
        user: { connect: { id: Number(userId) } },
      },
    });
    revalidatePath("/memorybook/home");
    return { message: "edit" };
  } catch (error) {
    console.error("旅行を編集する際にエラーが発生しました:", error);
    return { message: "旅行を編集する際にエラーが発生しました" };
  }
};

export const updateShare = async (id: number, data: FormData) => {
  const share = data.get("share") === "on";
  const userId = data.get("userId") as string;

  try {
    await prisma.itineraryHome.update({
      where: {
        id,
      },
      data: {
        share: share,
        user: { connect: { id: Number(userId) } },
      },
    });
  } catch {
    console.log("共有の変更に失敗しました");
  }
  redirect("/memorybook/home");
};
