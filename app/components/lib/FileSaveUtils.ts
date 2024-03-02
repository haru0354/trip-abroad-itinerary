"use server";

import { writeFile } from "fs/promises";
import { join } from "path";

// ファイルをディレクトリに保存
export const FileSaveUtils = async (file: File) => {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}_${file.name}`;
    const path = join("./", "public", "postImage", fileName);
    await writeFile(path, buffer);
    const fileUrl = `/postImage/${fileName}`;
    return { fileUrl, fileName };
  } catch (error) {
    console.error("画像を保存時にエラーが発生しました", error);
    throw error;
  }
};
