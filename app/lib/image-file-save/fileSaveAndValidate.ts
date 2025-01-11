import { z } from "zod";
import { validateSchema } from "@/app/(memorybook)/memorybook/lib/validate/validateSchema";
import { validateExtensionAndMineType } from "./validateExtensionAndMineType";
import { fileSaveBlogUtils, fileSaveItineraryUtils } from "./fileSaveUtils";

const ImageSchema = z.object({
  altText: z
    .string()
    .min(1, { message: "画像の追加時は「何の画像か」の入力は必須です。" }),
});

export const fileSaveAndValidate = async (
  image: File,
  altText: string,
  userId?: number
) => {
  try {
    const isValidFile = await validateExtensionAndMineType(image);

    if (!isValidFile) {
      return {
        result: false,
        errors: {
          image: [
            "画像ファイルが無効です。有効な画像ファイルを選択してください。",
          ],
        },
      };
    }

    const imageValidateDate = { altText };
    const imageValidated = validateSchema(ImageSchema, imageValidateDate);

    if (!imageValidated.success) {
      return {
        result: false,
        errors: imageValidated.errors,
      };
    }

    const { fileUrl, fileName } = userId
      ? await fileSaveItineraryUtils(image, userId)
      : await fileSaveBlogUtils(image);

    return {
      result: true,
      fileUrl,
      fileName,
    };
  } catch (error) {
    console.error("画像の追加時にエラーが発生しました", error);
    return {
      result: false,
      message: "画像の追加時にエラーが発生しました",
    };
  }
};
