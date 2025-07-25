"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Input from "./Input";
import InputImage from "./InputImage";

import type { ImageFormState } from "@/app/(blog)/types/formState";

type FormImageProps = {
  state?: ImageFormState;
  selectImage?: PostImage | null;
  formSubmitted?: boolean;
  defaultValue?: string | null | undefined;
  register: any;
  required?: boolean;
  error?: string | string[];
};

type PostImage = {
  url?: string | null;
  altText?: string | null;
};

const FormImage: React.FC<FormImageProps> = ({
  state,
  selectImage,
  formSubmitted,
  defaultValue,
  register,
  required = false,
  error,
}) => {
  const [fileErrorMessage, setFileErrorMessage] = useState<string>("");

  const [image, setImage] = useState<{ preview: string; data: File | string }>({
    preview: "",
    data: "",
  });
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const selectedFile = e.target.files ? e.target.files[0] : null;
    const maxSizeInBytes = 5 * 1024 * 1024;

    if (selectedFile) {
      if (!imageTypes.includes(selectedFile.type)) {
        setFileErrorMessage(
          "JPEG、PNG、GIF形式の画像ファイルを選択してください"
        );
        e.target.value = "";
        return;
      }

      if (selectedFile.size > maxSizeInBytes) {
        setFileErrorMessage(
          "画像サイズが大きすぎます。アップロードできる画像は5MBです。"
        );
        e.target.value = "";
        return;
      }

      const img = {
        preview: URL.createObjectURL(selectedFile),
        data: selectedFile,
      };
      setImage(img);
      setFileErrorMessage("");
    } else {
      console.error("ファイルが選択されていません");
      return;
    }
  };

  useEffect(() => {
    setImage({ preview: "", data: "" });
    setFileInputKey(Date.now());
  }, [formSubmitted]);

  return (
    <>
      <div className="flex mx-auto">
        {image.preview && (
          <>
            <div className="w-full mr-10">
              <p className="pb-2 mb-6 text-lg font-bold border-b">
                保存する画像
              </p>
              <Image
                src={image.preview}
                alt="保存する画像"
                width="300"
                height="300"
                className="pb-2 mb-6"
              />
            </div>
          </>
        )}
        {selectImage && selectImage.url && selectImage.altText && (
          <div className="w-full">
            <p className="pb-2 mb-6 text-lg font-bold border-b">
              選択してる画像
            </p>
            <Image
              src={selectImage.url}
              alt={selectImage.altText}
              width={300}
              height={180}
              style={{
                width: "280px",
                height: "auto",
              }}
            />
          </div>
        )}
      </div>
      <InputImage
        name="image"
        label="画像を選択"
        register={register}
        onChange={handleFileChange}
        key={fileInputKey}
        error={fileErrorMessage || state?.errors?.image}
      />
      <Input
        name="altText"
        label="画像の名前(何の画像)"
        placeholder="何の画像か入力してください。"
        register={register}
        defaultValue={defaultValue}
        required={required}
        error={error || state?.errors?.altText}
      />
    </>
  );
};

export default FormImage;
