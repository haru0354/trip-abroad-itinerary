import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, { message: "記事のタイトルの入力は必須です" }),
  content: z.string().min(1, { message: "記事の内容の入力は必須です" }),
  slug: z
    .string()
    .min(1, { message: "スラッグの入力は必須です。" })
    .regex(/^[a-z0-9-]+$/, {
      message: "スラッグは半角小文字の英数字で入力してください",
    }),
  description: z.string().min(1, { message: "記事の説明の入力は必須です" }),
  categoryId: z.string().transform((val) => Number(val)),
});
