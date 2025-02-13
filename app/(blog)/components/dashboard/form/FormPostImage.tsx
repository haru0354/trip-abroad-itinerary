"use client";

import { useFormState } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import FormContainer from "../../layout/dashboard/FormContainer";
import Button from "@/app/components/ui/button/Button";
import FormImage from "@/app/components/ui/form/FormImage";

import type { ImageFormState } from "@/app/(blog)/types/formState";
import type { PostImageFormType } from "@/app/(blog)/types/formTypes";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostImageFormType>({
    mode: "onBlur",
  });

  const initialState = {
    message: null,
    errors: { image: undefined, altText: undefined },
  };

  const [state, dispatch] = useFormState<ImageFormState, FormData>(
    formAction,
    initialState
  );

  const onSubmit: SubmitHandler<PostImageFormType> = async (data) => {
    const formData = new FormData();
    if (data.image) {
      if (data.image instanceof FileList) {
        formData.append("image", data.image[0]);
      } else if (data.image instanceof File) {
        formData.append("image", data.image);
      }
    }

    formData.append("altText", data.altText);

    try {
      dispatch(formData);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormImage
          selectImage={postImage}
          state={state}
          register={register}
          defaultValue={postImage?.altText}
          required={true}
          error={errors.altText?.message || state.errors?.altText}
        />
        {state.message && <p className="text-red-500">{state.message}</p>}
        <Button color="blue" size="normal" className="rounded mt-4">
          {buttonName}
        </Button>
      </form>
    </FormContainer>
  );
};

export default FormPostImage;
