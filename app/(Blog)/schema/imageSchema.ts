import { z } from "zod";

export const imageSchema = z.object({
  image: z.unknown().refine((value) => value instanceof File || !value, {
    message: "画像の選択は必須です",
  }),
  altText: z.string().min(1, { message: "画像の名前の入力は必須です。" }),
});

export const updateImageSchema = z.object({
  altText: z.string().min(1, { message: "画像の名前の入力は必須です。" }),
});
