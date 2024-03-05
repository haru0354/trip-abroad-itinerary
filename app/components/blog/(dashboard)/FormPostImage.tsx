"use client";

import Button from "../../ui/Button";
import { useFormState } from "react-dom";
import FormImage from "../../ui/FormImage";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    dispatch(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormImage selectImage={postImage} state={state} label="画像の名前(alt)" placeholder="どんな画像か入力してください。検索エンジンが画像を認識するのに役立ちます" />
        <Button className="px-24 my-8 py-3 shadow font-bold bg-gray-700 text-white hover:bg-white hover:text-black border border-gray-900">
          {buttonName}
        </Button>
      </form>
    </div>
  );
};

export default FormPostImage;
