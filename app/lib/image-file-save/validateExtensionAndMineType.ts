"use server";

// アップロードしたファイルの拡張子とmineタイプをバリデーション
export const validateExtensionAndMineType = async (file: File) => {
  try {
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const allowedMimeTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
    ];

    // ファイル名から拡張子を取得
    const filenameParts = file.name.split(".");

    if (filenameParts.length < 2) {
      console.error("ファイルの名に拡張子が含まれていません");
      return false;
    }

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
  } catch (error) {
    console.error(
      "ファイルの拡張子とmineタイプの検証中にエラーが発生しました:",
      error
    );
    return false;
  }
};
