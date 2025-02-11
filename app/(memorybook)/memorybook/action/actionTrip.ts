"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "@/app/lib/prisma";
import { getCurrentUserId } from "@/app/lib/getCurrentUser";
import { validateTripOwner } from "../lib/validate/validateTripOwner";
import { validateSchema } from "../../../lib/validateSchema";

import { tripSchema } from "../schema/tripSchema";
import type { TripFormState } from "../types/formState";

export const addTrip = async (state: TripFormState, data: FormData) => {
  const startDate = data.get("startDate") as string;
  const endDate = data.get("endDate") as string;
  const name = data.get("name") as string;
  const destination = data.get("destination") as string;
  const userId = await getCurrentUserId();

  if (!userId) {
    console.error("認証がされていません。");
    return { message: "再度ログインをし直してください。" };
  }

  const validateDate = {
    startDate,
    endDate,
    name,
    destination,
  };

  const validated = validateSchema(tripSchema, validateDate);

  if (!validated.success) {
    console.log(validated.errors);
    return { errors: validated.errors };
  }

  try {
    const createdTrip = await prisma.trip.create({
      data: {
        startDate,
        endDate,
        name,
        destination,
        user: { connect: { id: Number(userId) } },
      },
    });
    const createdTripId = createdTrip.id;
    revalidatePath("/memorybook/dashboard");
    return { message: "add", createdTripId: createdTripId };
  } catch (error) {
    console.error("旅行を追加する際にエラーが発生しました:", error);
    return { message: "旅行を追加する際にエラーが発生しました" };
  }
};

export const deleteTrip = async (data: FormData) => {
  const id = data.get("id") as string;
  const userId = await getCurrentUserId();

  if (!userId) {
    console.error("認証がされていません。");
    return { message: "再度ログインをし直してください。" };
  }

  const idValidTripOwner = await validateTripOwner(id);

  if (!idValidTripOwner) {
    console.error("権限の確認に失敗しました");
    return;
  }

  try {
    await prisma.trip.delete({
      where: {
        id: Number(id),
      },
    });
    console.log("旅行の削除をしました。");
  } catch (error) {
    console.error("旅行の削除中にエラーが発生しました:", error);
    return { message: "旅行の削除中にエラーが発生しました" };
  }
  redirect("/memorybook/dashboard");
};

export const updateTrip = async (
  id: number,
  state: TripFormState,
  data: FormData
) => {
  const startDate = data.get("startDate") as string;
  const endDate = data.get("endDate") as string;
  const name = data.get("name") as string;
  const destination = data.get("destination") as string;
  const userId = await getCurrentUserId();

  if (!userId) {
    console.error("認証がされていません。");
    return { message: "再度ログインをし直してください。" };
  }

  const tripId = String(id);
  const idValidTripOwner = await validateTripOwner(tripId);

  if (!idValidTripOwner) {
    console.error("権限の確認に失敗しました");
    return {};
  }

  const validateDate = {
    startDate,
    endDate,
    name,
    destination,
  };

  const validated = validateSchema(tripSchema, validateDate);

  if (!validated.success) {
    console.log(validated.errors);
    return { errors: validated.errors };
  }

  try {
    await prisma.trip.update({
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
    revalidatePath("/memorybook/dashboard");
    return { message: "edit" };
  } catch (error) {
    console.error("旅行を編集する際にエラーが発生しました:", error);
    return { message: "旅行を編集する際にエラーが発生しました" };
  }
};

export const updateShare = async (id: number, data: FormData) => {
  const share = data.get("share") === "on";
  const userId = await getCurrentUserId();

  if (!userId) {
    console.error("認証がされていません。");
    return { message: "再度ログインをし直してください。" };
  }

  const tripId = String(id);
  const idValidTripOwner = await validateTripOwner(tripId);

  if (!idValidTripOwner) {
    console.error("権限の確認に失敗しました");
    return {};
  }

  try {
    await prisma.trip.update({
      where: {
        id,
      },
      data: {
        share: share,
        user: { connect: { id: userId } },
      },
    });

    console.log("共有の変更に成功しました。");
  } catch (err) {
    console.log("共有の変更に失敗しました", err);
    return { message: "共有の変更に失敗しました" };
  }
  redirect("/memorybook/dashboard");
};
