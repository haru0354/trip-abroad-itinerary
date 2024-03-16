"use server";

import prisma from "../components/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

type FormState = {
  message?: string | null;
  errors?: {
    name?: string[] | undefined;
    email?: string[] | undefined;
  };
};

const schema = z.object({
  name: z.string().min(2, { message: "2文字以上入力する必要があります。" }),
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
});

export const updateProfile = async (
  id: number,
  state: FormState,
  data: FormData
) => {
  const name = data.get("name") as string;
  const email = data.get("email") as string;
  const userId = data.get("userId") as string;

  const validatedFields = schema.safeParse({
    name,
    email,
  });

  if (!validatedFields.success) {
    const errors = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "failure",
    };
    console.log(errors);
    return errors;
  }

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });
    revalidatePath("/memorybook/home/profile");
    return { message: "edit" };
  } catch (error) {
    console.error("プロフィールを編集する際にエラーが発生しました:", error);
    return { message: "プロフィールを編集する際にエラーが発生しました" };
  }
};
