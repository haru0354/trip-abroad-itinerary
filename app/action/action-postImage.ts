"use server";

import { redirect } from "next/navigation";
import prisma from "../components/lib/prisma";
import { writeFile } from "fs/promises";
import { join } from "path";

export const addPostImage = async (data: FormData) => {
  console.log("受信");

  const file = data.get("file") as File;
  const altText = data.get("altText") as string;

  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}_${file.name}`;

  const path = join("./", "public", "postImage", fileName);
  await writeFile(path, buffer);
  const fileUrl = `/postImage/${fileName}`;

  try {
    await prisma.postImage.create({
      data: {
        url: fileUrl,
        altText,
      },
    });
  } catch (error) {
    console.error("画像を投稿する際にエラーが発生しました", error);
  }
  redirect("/home/image");

};
