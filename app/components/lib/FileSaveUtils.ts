import { writeFile } from "fs/promises";
import { join } from "path";

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
    console.error("記事を投稿する際にエラーが発生しました", error);
    throw error;
  }
};
