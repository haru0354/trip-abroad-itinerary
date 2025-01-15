"use client";

import { useFormState } from "react-dom";
import Button from "@/app/components/ui/Button";
import FormImage from "@/app/components/ui/FormImage";

type FormPostImageProps = {
  postImage?: PostImage | null;
  buttonName: string;
  formAction: (state: FormState, data: FormData) => Promise<FormState>;
};

type PostImage = {
  url: string;
  altText: string;
};

type FormState = {
  message?: string | null;
  errors?: {
    image?: string[] | undefined;
    altText?: string[] | undefined;
  };
};

const FormPostImage: React.FC<FormPostImageProps> = ({
  postImage,
  buttonName,
  formAction,
}) => {
  const initialState = {
    message: null,
    errors: { image: undefined, altText: undefined },
  };
  
  const [state, dispatch] = useFormState<FormState, FormData>(
    formAction,
    initialState
  );

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-full border py-4 px-6  border-gray-300 rounded bg-white max-w-full">
          <form action={dispatch}>
            <FormImage
              selectImage={postImage}
              state={state}
              label="画像の名前(alt)"
              placeholder="どんな画像か入力してください。検索エンジンが画像を認識するのに役立ちます"
              defaultValue={postImage?.altText}
            />
            <Button color="blue" size="normal" className="rounded mt-4">
              {buttonName}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormPostImage;
