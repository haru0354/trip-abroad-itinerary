"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "@/app/lib/prisma";
import { supabase } from "@/app/util/supabase";
import { getItinerary } from "@/app/(memorybook)/memorybook/lib/memoryBookService";
import { validateTripOwner } from "../lib/validate/validateTripOwner";
import { getCurrentUserId } from "@/app/lib/getCurrentUser";
import { validateSchema } from "../../../lib/validateSchema";
import { fileSaveAndValidate } from "@/app/lib/image-file-save/fileSaveAndValidate";

type FormState = {
  message?: string | null;
  errors?: {
    date?: string[] | undefined;
    time?: string[] | undefined;
    name?: string[] | undefined;
    content?: string[] | undefined;
    hideContent?: string[] | undefined;
    tripId?: string[] | undefined;
    image?: string[] | undefined;
  };
};

const schema = z.object({
  date: z.string().min(1, { message: "日付の入力は必須です" }),
  time: z.string().min(1, { message: "時間の入力は必須です" }),
  name: z.string().min(1, { message: "タイトルの入力は必須です" }),
  content: z.string().optional(),
  hideContent: z.string().optional(),
  tripId: z.string().transform((val) => Number(val)),
});

const ImageSchema = z.object({
  altText: z
    .string()
    .min(1, { message: "画像の追加時は「何の画像か」の入力は必須です。" }),
});

export const addItinerary = async (state: FormState, data: FormData) => {
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
    return { message: "認証がされていません。" };
  }

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
    date,
    time,
    name,
    content,
    hideContent,
    tripId,
  };

  const validated = validateSchema(schema, validateDate);

  if (!validated.success) {
    console.log(validated.errors);
    return validated.errors;
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
        return result.errors;
      } else if (result.message) {
        console.error("画像保存時にエラーが発生しました:", result.message);
        return result.message;
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
    return { message: "認証がされていません。" };
  }

  const tripId = data.get("tripId") as string;

  if (!tripId) {
    console.error("旅行プランの指定が正しくありません");
    return { message: "旅行プランの指定が正しくありません" };
  }

  const idValidTripOwner = await validateTripOwner(tripId);

  if (!idValidTripOwner) {
    return { message: "権限がありません" };
  }

  const itinerary = await getItinerary(itineraryId);

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
  state: FormState,
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
    return {};
  }

  const tripId = data.get("tripId") as string;

  if (!tripId) {
    console.error("旅行プランの指定が正しくありません");
    return { message: "旅行プランの指定が正しくありません" };
  }

  const idValidTripOwner = await validateTripOwner(tripId);

  if (!idValidTripOwner) {
    console.error("権限の確認に失敗しました");
    return {};
  }

  const validateDate = {
    date,
    time,
    name,
    content,
    hideContent,
    tripId,
  };

  const validated = validateSchema(schema, validateDate);

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

    const itineraryIdString = itineraryId.toString();
    const itinerary = await getItinerary(itineraryIdString);

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
