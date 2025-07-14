import { z } from "zod";

export const tripSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  name: z
    .string()
    .min(1, { message: "タイトルの入力は必須です" })
    .max(36, { message: "文字数は最大で36文字です" }),
  destination: z
    .string()
    .max(12, { message: "文字数は最大で12文字です" })
    .optional()
});
