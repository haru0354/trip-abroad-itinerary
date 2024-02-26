"use client";
import { addImage } from "@/app/action/action-postImage";

import Form from "../ui/Form";
import Button from "../ui/Button";
import { useState } from "react";

type FormImageProps = {
  postImage?: PostImage | null;
  buttonName: string;
  formAction?: (formData: FormData) => Promise<void>;
};

type PostImage = {
  url: string;
  altText: string;
};

const FormImage: React.FC<FormImageProps> = ({
  postImage,
  buttonName,
  formAction,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<ArrayBuffer | null>(null);

  const handleUploadClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile) {
      setFile(selectedFile);
      console.log("ファイルを選択完了");

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data instanceof ArrayBuffer) {
          setFileData(data); // バッファーデータをセット
        } else {
          console.error("ファイルをバッファーデータに変換できませんでした");
        }
      };
      reader.readAsArrayBuffer(selectedFile); // 読み込みをArrayBufferとして実行
    } else {
      console.error("ファイルが選択されていません");
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      console.error("File not selected");
      return;
    }

    // ArrayBuffer を Blob に変換
    let blob = null;
    if (fileData instanceof ArrayBuffer) {
      blob = new Blob([fileData]);
    } else {
      console.error('バッファーデータが null です');
      return;
    }

    // フォームデータを作成
    const formData = new FormData();
    console.log(blob);

    // ファイルが存在する場合のみ追加
    if (file && blob) {
      formData.append("image", blob, file.name); // Blob を追加。第三引数にファイル名を指定
    }

    console.log("ファイルを送信？");
    console.log(file);
  };

  return (
    <div>
      {fileData && (
        <img
          src={`data:image/jpeg;base64,${Buffer.from(fileData).toString(
            "base64"
          )}`}
        />
      )}
      <form action={addImage} >
        <input type="file" name="image" onChange={handleUploadClick} />
        <Form
          label="画像の名前"
          name="altText"
          placeholder="画像の名前を入力してください。"
          defaultValue={postImage?.altText}
        />
        <button onClick={handleSubmit}>{buttonName}</button>
      </form>
    </div>
  );
};

export default FormImage;
