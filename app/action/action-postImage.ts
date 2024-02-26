"use server";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { redirect } from "next/navigation";
import prisma from "../components/lib/prisma";
import { log } from "console";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

type File = {
  size: number;
  type: string;
  name: string;
  lastModified: number;
};

interface FormidableFile {
  path: string;
  name: string;
  type?: string;
  lastModifiedDate?: Date;
}

export const addImage = async (formData: FormData) => {
  console.error("受信完了");

  const altText = formData.get("altText") as string;
  const file = formData.get("image") as File;
  console.error("ファイル:", file);
  console.error("フォームデータ", formData);

  // 画像を保存するディレクトリのパス
  const uploadDirectory = path.join(process.cwd(), "public", "postImage");

  try {
    if (!file) {
      console.error("Image file is missing");
      return;
    }

    // 画像の保存パスを生成
    const imagePath = path.join(uploadDirectory, file.name);

    // ファイルのデータを読み取るためのFileReaderを作成
    const reader = new FileReader();

    // ファイルの読み込みが完了したときの処理
    reader.onload = async () => {
      // ファイルのデータを取得
      const fileData = reader.result as ArrayBuffer;
      console.error("ファイルのデータを取得", fileData);

    };

    // ファイルを保存し、URL を取得
    const uploadedImageUrl = await saveFileAndGetUrl(file);

    if (!altText || !uploadedImageUrl) {
      console.error("Alt text or image URL is missing");
      return;
    }
    // 画像情報をデータベースに保存
    await prisma.postImage.create({
      data: {
        url: uploadedImageUrl,
        altText,
      },
    });
  } catch (error) {
    console.error("Error adding image", error);
  }
};

const saveFileAndGetUrl = async (file: File) => {
  try {
    // 画像を保存するディレクトリのパス
    const uploadDirectory = path.join(process.cwd(), "public", "postImage");
    console.log("画像を保存するディレクトリのパス:", uploadDirectory);
    // ファイル名を生成
    const fileName = `${Date.now()}_${file.name}`;
    // ファイルの一時フルパスを生成
    const filePath = path.join(uploadDirectory, fileName);
    console.log("ファイルの一時フルパスを生成:", uploadDirectory);

    await fs.promises.writeFile(filePath, file);

    // ファイルの一時ディレクトリのパスを読み込み
    const tmpDir = os.tmpdir();
    console.log("一時ディレクトリのパス:", tmpDir);

    // ファイルのバッファを読み込む

    // バッファを使ってファイルを保存
    await fs.promises.writeFile(filePath, fileBuffer);
    console.log("ファイルのバッファを取得:", reader);

    // 保存したファイルの URL を生成する
    const fileUrl = `/postImage/${fileName}`;
    // 保存したファイルの URL を返す
    return fileUrl;
  } catch (error) {
    console.error("Error saving file", error);
    throw error;
  }
};
