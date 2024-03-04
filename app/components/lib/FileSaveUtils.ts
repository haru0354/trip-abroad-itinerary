"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

// ファイルをディレクトリに保存
export const FileSaveUtils = async (image: File) => {
  try {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}_${image.name}`;
    const directory = join("./", "public", "postImage"); 
    const path = join(directory, fileName);
    await mkdir(directory, { recursive: true });
    await writeFile(path, buffer);
    const fileUrl = `/postImage/${fileName}`;
    return { fileUrl, fileName };
  } catch (error) {
    console.error("画像を保存時にエラーが発生しました", error);
    throw error;
  }
};

export const FileSaveItineraryUtils = async (image: File, userId: string) => {
  try {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}_${image.name}`;
    const directory = join("./", "public", "itinerary", `${userId}`); 
    const path = join(directory, fileName);
    await mkdir(directory, { recursive: true });
    await writeFile(path, buffer);
    const fileUrl = `/itinerary/${userId}/${fileName}`;
    return { fileUrl, fileName };    
    console.log("画像の保存に成功しました。");
  } catch (error) {
    console.error("画像を保存時にエラーが発生しました", error);
    throw error;
  }
};