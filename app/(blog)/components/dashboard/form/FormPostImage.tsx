"use client";

import { useFormState } from "react-dom";

import FormContainer from "../../layout/dashboard/FormContainer";
import Button from "@/app/components/ui/Button";
import FormImage from "@/app/components/ui/FormImage";

import type { ImageFormState } from "@/app/(blog)/types/formState";

type FormPostImageProps = {
  postImage?: PostImage | null;
  buttonName: string;
  formAction: (
    state: ImageFormState,
    data: FormData
  ) => Promise<ImageFormState>;
};

type PostImage = {
  url: string;
  altText: string;
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

  const [state, dispatch] = useFormState<ImageFormState, FormData>(
    formAction,
    initialState
  );

  return (
    <FormContainer>
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
    </FormContainer>
  );
};

export default FormPostImage;
