import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, { message: "カテゴリ名の入力は必須です" }),
  slug: z
    .string()
    .min(1, { message: "スラッグの入力は必須です。" })
    .regex(/^[a-z0-9-]+$/, {
      message: "スラッグは半角小文字の英数字で入力してください",
    }),
  content: z.string().optional(),
  description: z.string().optional(),
  title: z.string().optional(),
});
