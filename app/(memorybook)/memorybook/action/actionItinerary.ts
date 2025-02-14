"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "@/app/lib/prisma";
import { supabase } from "@/app/util/supabase";
import { getItinerary } from "@/app/(memorybook)/memorybook/lib/memoryBookService";
import { validateTripOwner } from "../lib/validate/validateTripOwner";
import { getCurrentUserId } from "@/app/lib/getCurrentUser";
import { validateSchema } from "../../../lib/validateSchema";
import { fileSaveAndValidate } from "@/app/lib/image-file-save/fileSaveAndValidate";

import { itinerarySchema } from "../schema/itinerarySchema";
import type { ItineraryFormState } from "../types/formState";

export const addItinerary = async (
  state: ItineraryFormState,
  data: FormData
) => {
  const date = data.get("date") as string;
  const time = data.get("time") as string;
  const name = data.get("name") as string;
  const content = data.get("content") as string;
  const hideContent = data.get("hideContent") as string;
  const image = data.get("image") as File;
  const altText = data.get("altText") as string;
  const userId = await getCurrentUserId();

  if (!userId) {
    console.error("認証がされていません。");
    return { message: "ログインをし直してください。" };
  }

  const tripId = data.get("tripId") as string;

  if (!tripId) {
    console.error("旅行プランの指定が正しくありません");
    return { message: "もう一度やり直してください" };
  }

  const idValidTripOwner = await validateTripOwner(tripId);

  if (!idValidTripOwner) {
    console.error("権限の確認に失敗しました");
    return { message: "もう一度やり直してください" };
  }
  const validateDate = {
    date,
    time,
    name,
    content,
    hideContent,
    tripId,
  };

  const validated = validateSchema(itinerarySchema, validateDate);

  if (!validated.success) {
    console.log(validated.errors);
    return { errors: validated.errors };
  }

  const ItineraryData: any = {
    date,
    time,
    name,
    content,
    hideContent,
    trip: { connect: { id: Number(tripId) } },
  };

  if (image && image.size > 0) {
    const result = await fileSaveAndValidate(image, altText, userId);

    if (result.result) {
      ItineraryData.url = result.fileUrl;
      ItineraryData.imageName = result.fileName;
      ItineraryData.altText = altText;
    } else {
      if (result.errors) {
        console.error("画像のバリデーションエラー:", result.errors);
        return { errors: result.errors };
      } else if (result.message) {
        console.error("画像保存時にエラーが発生しました:", result.message);
        return { message: result.message };
      }
    }
  }

  try {
    await prisma.itinerary.create({
      data: ItineraryData,
    });
    revalidatePath(`/memorybook/${tripId}/itinerary/`);
    return { message: "add" };
  } catch (error) {
    console.error("旅程を追加する際にエラーが発生しました:", error);
    return { message: "旅程を追加する際にエラーが発生しました" };
  }
};

export const deleteItinerary = async (data: FormData) => {
  const itineraryId = data.get("id") as string;
  const userId = await getCurrentUserId();

  if (!userId) {
    console.error("認証がされていません。");
    return { message: "ログインをし直してください。" };
  }

  const tripId = data.get("tripId") as string;

  if (!tripId) {
    console.error("旅行プランの指定が正しくありません");
    return { message: "もう一度やり直してください" };
  }

  const idValidTripOwner = await validateTripOwner(tripId);

  if (!idValidTripOwner) {
    console.error("権限の確認に失敗しました");
    return { message: "もう一度やり直してください" };
  }

  const itineraryNumber = Number(itineraryId)
  const itinerary = await getItinerary(itineraryNumber);

  if (!itinerary) {
    console.error("指定した旅程が見つかりませんでした。");
    return { message: "指定した旅程が見つかりませんでした。" };
  }

  if (itinerary.url) {
    try {
      const fileName = itinerary.imageName;
      const directory = `itinerary/${userId}`;
      const saveFileUrl = `${directory}/${fileName}`;
      await supabase.storage.from("itinerary").remove([saveFileUrl]);
      console.log("画像の削除に成功しました");
    } catch (error) {
      console.error("画像の削除中にエラーが発生しました:", error);
      return { message: "画像の削除中にエラーが発生しました" };
    }
  }

  try {
    await prisma.itinerary.delete({
      where: {
        id: Number(itineraryId),
      },
    });
    console.log("旅程を削除しました。");
  } catch (error) {
    console.error("旅程の削除中にエラーが発生しました:", error);
    return { message: "旅程の削除中にエラーが発生しました" };
  }
  redirect(`/memorybook/${tripId}/itinerary/`);
};

export const updateItinerary = async (
  itineraryId: number,
  state: ItineraryFormState,
  data: FormData
) => {
  const date = data.get("date") as string;
  const time = data.get("time") as string;
  const name = data.get("name") as string;
  const content = data.get("content") as string;
  const hideContent = data.get("hideContent") as string;
  const image = data.get("image") as File;
  const altText = data.get("altText") as string;
  const userId = await getCurrentUserId();

  if (!userId) {
    console.error("認証がされていません。");
    return { message: "ログインをし直してください。" };
  }

  const tripId = data.get("tripId") as string;

  if (!tripId) {
    console.error("旅行プランの指定が正しくありません");
    return { message: "もう一度やり直してください" };
  }

  const idValidTripOwner = await validateTripOwner(tripId);

  if (!idValidTripOwner) {
    console.error("権限の確認に失敗しました");
    return { message: "もう一度やり直してください" };
  }

  const validateDate = {
    date,
    time,
    name,
    content,
    hideContent,
    tripId,
  };

  const validated = validateSchema(itinerarySchema, validateDate);

  if (!validated.success) {
    console.log(validated.errors);
    return { errors: validated.errors };
  }

  const ItineraryData: any = {
    date,
    time,
    name,
    content,
    hideContent,
    trip: { connect: { id: Number(tripId) } },
  };

  if (image && image.size > 0) {
    const result = await fileSaveAndValidate(image, altText, userId);

    if (result.result) {
      ItineraryData.url = result.fileUrl;
      ItineraryData.imageName = result.fileName;
      ItineraryData.altText = altText;
    } else {
      if (result.errors) {
        console.error("画像のバリデーションエラー:", result.errors);
        return { errors: result.errors };
      } else if (result.message) {
        console.error("画像保存時にエラーが発生しました:", result.message);
        return { message: result.message };
      }
    }

    const itinerary = await getItinerary(itineraryId);

    if (itinerary?.url) {
      try {
        const fileName = itinerary.imageName;
        const directory = `itinerary/${userId}`;
        const saveFileUrl = `${directory}/${fileName}`;
        await supabase.storage.from("itinerary").remove([saveFileUrl]);
        console.log("画像の削除に成功しました");
      } catch (error) {
        console.error("画像の削除中にエラーが発生しました:", error);
        return { message: "画像の削除中にエラーが発生しました" };
      }
    }
  }

  try {
    await prisma.itinerary.update({
      where: {
        id: itineraryId,
      },
      data: ItineraryData,
    });
    revalidatePath(`/memorybook/${tripId}/itinerary/`);
    return { message: "edit" };
  } catch (error) {
    console.error("旅程を追加する際にエラーが発生しました:", error);
    return { message: "旅程を追加する際にエラーが発生しました" };
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
};
