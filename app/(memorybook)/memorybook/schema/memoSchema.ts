import { z } from "zod";

export const memoSchema = z.object({
  name: z.string().min(1, { message: "タイトルの入力は必須です" }),
  content: z.string().optional(),
  tripId: z.string().transform((val) => (val)),
});
