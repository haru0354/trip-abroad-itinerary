import Image from "next/image";
import Form from "./Form";
import { useState } from "react";

type FormImageProps = {
  state?: State;
  selectImage?: PostImage | null;
  altTextValue?: string;
  imageValue?: string;
  onChangeAltText?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type State = {
  message?: string | null;
  errors?: {
    image?: string[] | undefined;
    altText?: string[] | undefined;
  };
};

type PostImage = {
  url?: string | null;
  altText?: string | null;
};

const FormImage: React.FC<FormImageProps> = ({ state, selectImage, altTextValue, imageValue, onChangeAltText}) => {
  const [error, setError] = useState<string>("");
  const [image, setImage] = useState<{ preview: string; data: File | string }>({
    preview: "",
    data: "",
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageTypes = ["image/jpeg", "image/png", "image/gif"];
    const selectedFile = e.target.files ? e.target.files[0] : null;
    const maxSizeInBytes = 1024 * 1024;

    if (selectedFile) {
      if (!imageTypes.includes(selectedFile.type)) {
        setError("JPEG、PNG、GIF形式の画像ファイルを選択してください");
        e.target.value = "";
        return;
      }

      if (selectedFile.size > maxSizeInBytes) {
        setError("画像サイズが大きすぎます。アップロードできる画像は1MBです。");
        e.target.value = "";
        return;
      }

      const img = {
        preview: URL.createObjectURL(selectedFile),
        data: selectedFile,
      };
      setImage(img);
      setError("");
    } else {
      console.error("ファイルが選択されていません");
      return;
    }
  };

  return (
    <>
      <div className="flex mx-auto">
        {image.preview && (
          <>
            <div className="mr-10 w-full">
              <p className="text-lg font-bold border-b pb-2 mb-6 bold text-gray-900">
                保存する画像
              </p>
              <img
                src={image.preview}
                width="300"
                height="300"
                className="pb-2 mb-6"
              />
            </div>
          </>
        )}
        {selectImage && selectImage.url && selectImage.altText &&(
          <div className="w-full">
            <p className="text-lg font-bold border-b pb-2 mb-6 bold text-gray-900">
              選択してる画像
            </p>
            <Image
              src={selectImage.url}
              alt={selectImage.altText}
              width={300}
              height={300}
              style={{
                width: "300px",
                height: "auto",
              }}
            />
          </div>
        )}
      </div>
      <Form
        name="image"
        label="画像を選択"
        type="file"
        onChange={handleFileChange}
      />
      {error && <p className="text-red-500">{error}</p>}
      {state?.errors && state.errors.image && (
        <p className="text-red-500">{state.errors.image}</p>
      )}
      <Form
        label="画像の名前(alt)"
        name="altText"
        value={altTextValue}
        placeholder={
          "どんな画像か入力してください。検索エンジンが画像を認識するのに役立ちます"
        }
        onChange={onChangeAltText}
      />
      {state?.errors && state.errors.altText && (
        <p className="text-red-500">{state.errors.altText}</p>
      )}
    </>
  );
};

export default FormImage;
