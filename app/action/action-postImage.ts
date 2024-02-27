"use server";
import formidable from "formidable";
import { redirect } from "next/navigation";
import prisma from "../components/lib/prisma";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import multer from "multer";

type File = {
  size: number;
  type: string;
  name: string;
  lastModified: number;
};

export const addImage = async (formData: FormData) => {
  console.error("受信完了");

  const altText = formData.get("altText") as string;
  const file = formData.get("image") as File;
  const blob = formData.get("blob") as File;
  const file00 = formData.get("file00") as File;

  console.error("フォームデータ", formData);
  console.error("ファイル:", file);
  console.error("blob", blob);
  console.error("file00", file00);
  const fileName = `${Date.now()}_${file.name}`;
  const uploadDirectory = path.join(process.cwd(), "public", "postImage");
  console.error("uploadDirectory", uploadDirectory);

  // ファイルの保存先とファイル名の設定
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDirectory); // アップロード先のディレクトリを指定
    },
    filename: function (req, file, cb) {
      cb(null, fileName); // ファイル名はオリジナルの名前を使用
    },
  });

  // multerの設定
  const upload = multer({ storage: storage });
  console.error("upload", upload);
  const res = console.error("res", upload);

  // ファイルの受け取りと保存
  const addImageMiddleware = upload.single("image"); // 'image'はFormData内のフィールド名
  console.error("addImageMiddleware", addImageMiddleware);
  addImageMiddleware(file, res, (err) => {
    if (err) {
      console.error("エラー", upload);
      return;
    }
    console.error("成功", upload);
  });
};

const saveFileAndGetUrl = async (file: File, blob: File) => {
  if (file) {
    // 画像を保存するディレクトリのパス
    const uploadDirectory = path.join(process.cwd(), "public", "postImage");
    console.log("画像を保存するディレクトリのパス:", uploadDirectory);

    try {
      // ファイル名を生成
      const fileName = `${Date.now()}_${file.name}`;
      // ファイルパスを生成
      const filePath = path.join(uploadDirectory, fileName);
      console.log("ファイルパス:", filePath);
      // Blob を画像ファイルとして保存

      saveBlobAsImage(blob, filePath)
        .then((savedFilePath) => {
          console.log(`画像ファイルを保存しました: ${savedFilePath}`);
        })
        .catch((err) => {
          console.error("画像ファイルの保存に失敗しました:", err);
        });

      // 保存したファイルの URL を生成する
      const fileUrl = `/postImage/${fileName}`;
      console.log("保存したファイルの URL を生成する:", fileUrl);

      return fileUrl;
    } catch (err) {
      console.error("ファイルの保存中にエラーが発生しました:", err);
    }
  }
};

// Blob オブジェクトを画像ファイルとして保存する関数
async function saveBlobAsImage(blob: File, filePath: string) {
  console.log("saveBlobAsImageの呼び出し:", saveBlobAsImage);

  return new Promise((resolve, reject) => {
    // ファイルの一時ディレクトリのパスを読み込み
    const tmpDir = os.tmpdir();
    console.log("一時ディレクトリのパス:", tmpDir);
    // 一時ファイル名
    const tmpFileName = `${Date.now()}_${blob.name}`;
    console.log("一時ファイル名:", tmpFileName);
    // 一時ファイルのパスを生成
    const tmpFilePath = path.join(tmpDir, tmpFileName);
    console.log("一時ファイルのパス:", tmpFilePath);

    const reader = fs.createReadStream(blob.path); // ファイルの読み込みストリームを作成
    console.log("一時ファイル名:reader", reader);

    const writer = fs.createWriteStream(filePath); // ファイルの書き込みストリームを作成
    console.log("一時ファイル名:writer", writer);

    reader.on("error", reject); // 読み込みストリームのエラーを処理
    writer.on("error", reject); // 書き込みストリームのエラーを処理

    // ファイルに Buffer を書き込み
    writer.on("finish", () => {
      fs.rename(tmpFilePath, filePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(filePath); // 書き込みが完了したらPromiseを解決する
        }
      });
    });

    reader.pipe(writer); // 読み込みストリームから書き込みストリームにデータをパイプする
  });
}
