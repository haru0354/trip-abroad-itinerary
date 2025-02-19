import { z } from "zod";

export const createAccountSchema = z.object({
  name: z.string().min(2, { message: "2文字以上入力する必要があります。" }),
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z.string().min(6, { message: "6文字以上入力する必要があります。" }),
});

export const deleteUserSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "6文字以上入力する必要があります。" }),
    passwordConfirmation: z
      .string()
      .min(6, { message: "6文字以上入力する必要があります。" }),
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: "custom",
        path: ["passwordConfirmation"],
        message: "「パスワード」と「確認用パスワード」が一致しません。",
      });
    }
  });

export const changeEmailSchema = z
  .object({
    email: z
      .string()
      .email({ message: "メールアドレスの形式ではありません。" }),
    emailConfirmation: z
      .string()
      .email({ message: "メールアドレスの形式ではありません。" }),
    password: z
      .string()
      .min(6, { message: "6文字以上入力する必要があります。" }),
  })
  .refine((data) => data.email === data.emailConfirmation, {
    message: "「メールアドレス」と「確認用メールアドレス」が一致しません。",
    path: ["emailConfirmation"],
  });

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "6文字以上入力する必要があります。" }),
    newPassword: z
      .string()
      .min(6, { message: "6文字以上入力する必要があります。" }),
    passwordConfirmation: z
      .string()
      .min(6, { message: "6文字以上入力する必要があります。" }),
  })
  .superRefine(({ password, newPassword, passwordConfirmation }, ctx) => {
    if (newPassword !== passwordConfirmation) {
      ctx.addIssue({
        code: "custom",
        path: ["passwordConfirmation"],
        message: "「新しいパスワード」と「確認用パスワード」が一致しません。",
      });
    }
    if (password === newPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["newPassword"],
        message: "現在のパスワードと同じものは使用できません。",
      });
    }
  });

export const profileSchema = z.object({
  name: z.string().min(2, { message: "2文字以上入力する必要があります。" }),
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
});
