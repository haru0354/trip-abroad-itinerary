import { writeFile } from "fs/promises";
import { join } from "path";

export const FileSaveUtils = async (file: File) => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}_${file.name}`;
    const path = join("./", "public", "postImage", fileName);
    await writeFile(path, buffer);
    const fileUrl = `/postImage/${fileName}`;
    return { fileUrl, fileName };
}
