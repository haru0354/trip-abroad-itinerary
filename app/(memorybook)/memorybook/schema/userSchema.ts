import { z } from "zod";

export const createAccountSchema = z.object({
  name: z.string().min(2, { message: "2文字以上入力する必要があります。" }),
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z.string().min(6, { message: "6文字以上入力する必要があります。" }),
});

export const profileSchema = z.object({
  name: z.string().min(2, { message: "2文字以上入力する必要があります。" }),
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
});

export const passwordSchema = z.object({
  password: z.string().min(6, { message: "6文字以上入力する必要があります。" }),
  passwordConfirmation: z
    .string()
    .min(6, { message: "6文字以上入力する必要があります。" }),
});
