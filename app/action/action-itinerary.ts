"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../components/lib/prisma";
import { z } from "zod";
import { FileSaveItineraryUtils } from "../components/lib/FileSaveUtils";
import { validateFile } from "../components/lib/ValidateFile ";
import { promises as fsPromises } from "fs";

const { unlink } = fsPromises;

type FormState = {
  message?: string | null;
  errors?: {
    date?: string[] | undefined;
    time?: string[] | undefined;
    name?: string[] | undefined;
    content?: string[] | undefined;
    hideContent?: string[] | undefined;
    userId?: string[] | undefined;
    image?: string[] | undefined;
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

  const ItineraryData: any = {
    date,
    time,
    name,
    content,
    hideContent,
    user: { connect: { id: Number(userId) } },
  };

  if (image && image.size > 0) {
    try {
      const isValidFile = await validateFile(image);

      if (!isValidFile) {
        const errors = {
          errors: {
            image: [
              "画像ファイルが無効です。有効な画像ファイルを選択してください。",
            ],
          },
        };
        console.log(errors);
        return errors;
      }

      const validatedFields = ImageSchema.safeParse({
        altText,
      });

      if (!validatedFields.success) {
        const errors = {
          errors: validatedFields.error.flatten().fieldErrors,
        };
        console.log(errors);
        return errors;
      }

      const { fileUrl, fileName } = await FileSaveItineraryUtils(image, userId);

      ItineraryData.url = fileUrl;
      ItineraryData.imageName = fileName;
      ItineraryData.altText = altText;

      console.log("画像の追加に成功しました。");
    } catch (error) {
      console.error("画像の追加時にエラーが発生しました", error);
      return { message: "画像の追加時にエラーが発生しました" };
    }
  }
  try {
    await prisma.itinerary.create({
      data: ItineraryData,
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
    const itinerary = await prisma.itinerary.findUnique({
      where: {
        id,
      },
    });

    if (!itinerary) {
      console.error("指定した旅程が見つかりませんでした。");
      return;
    }

    await prisma.itinerary.delete({
      where: {
        id,
      },
    });

    await unlink(`./public/${itinerary?.url}`);
    console.log("旅程と画像を削除しました。");
  } catch (error) {
    console.error("旅程の削除中にエラーが発生しました:", error);
    return { message: "旅程の削除中にエラーが発生しました" };
  }
  redirect("/travel_brochure/itinerary");
};

export const updateItinerary = async (
  id: number,
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

  const ItineraryData: any = {
    date,
    time,
    name,
    content,
    hideContent,
    user: { connect: { id: Number(userId) } },
  };

  if (image && image.size > 0) {
    try {
      const isValidFile = await validateFile(image);

      if (!isValidFile) {
        const errors = {
          errors: {
            image: [
              "画像ファイルが無効です。有効な画像ファイルを選択してください。",
            ],
          },
        };
        console.log(errors);
        return errors;
      }

      const validatedFields = ImageSchema.safeParse({
        altText,
      });

      if (!validatedFields.success) {
        const errors = {
          errors: validatedFields.error.flatten().fieldErrors,
        };
        console.log(errors);
        return errors;
      }

      const itinerary = await prisma.itinerary.findUnique({
        where: {
          id,
        },
      });

      await unlink(`./public/${itinerary?.url}`);

      const { fileUrl, fileName } = await FileSaveItineraryUtils(image, userId);

      ItineraryData.imageName = fileName;
      ItineraryData.url = fileUrl;
      ItineraryData.altText = altText;

      console.log("画像の追加に成功しました。");
    } catch (error) {
      console.error("画像の追加時にエラーが発生しました", error);
      return { message: "画像の追加時にエラーが発生しました" };
    }
  }

  try {
    await prisma.itinerary.update({
      where: {
        id,
      },
      data: ItineraryData,
    });
    revalidatePath("/travel_brochure/itinerary");
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
  revalidatePath("/travel_brochure/itinerary");
};
