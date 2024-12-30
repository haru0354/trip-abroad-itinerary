"use server";

// アップロードしたファイルの拡張子とmineタイプをバリデーション
export const validateFile = async (file: File) => {
  const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  
  // ファイル名から拡張子を取得
  const filenameParts = file.name.split(".");
  const extension = filenameParts[filenameParts.length - 1].toLowerCase();

  const mimeType = file.type.toLowerCase();

  if (!allowedExtensions.includes(extension)) {
    console.error("許可されていないファイルの拡張子です");
    return false;
  }

  if (!allowedMimeTypes.includes(mimeType)) {
    console.error("許可されていないファイルのMIMEタイプです");
    return false;
  }

  console.log("ファイルの拡張子とmineタイプの検証完了");
  return true;
};


