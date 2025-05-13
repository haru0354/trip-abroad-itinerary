"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import FormContainer from "../../layout/dashboard/FormContainer";
import FormImage from "@/app/components/ui/form/FormImage";

import type { PostImage } from "@prisma/client";
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

const FormPostImage: React.FC<FormPostImageProps> = ({
  postImage,
  buttonName,
  formAction,
}) => {
  const router = useRouter();

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
      toast.error("エラーが発生しました。");
      state.message = "エラーが発生しました。もう一度お試しください。";
    }
  };

  useEffect(() => {
    if (state.message === "add") {
      state.message = "";
      toast.success("画像を保存しました！");
      router.replace("/dashboard/image");
    } else if (state.message === "edit") {
      state.message = "";
      toast.success("画像を編集しました！");
      router.replace("/dashboard/image");
    }
  }, [state.message]);

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} buttonName={buttonName}>
      <FormImage
        selectImage={postImage}
        state={state}
        register={register}
        defaultValue={postImage?.altText}
        required={true}
        error={errors.altText?.message}
      />
      {state.message && state.message !== "edit" && state.message !== "add" && (
        <p className="text-red-500">{state.message}</p>
      )}

    </FormContainer>
  );
};

export default FormPostImage;
