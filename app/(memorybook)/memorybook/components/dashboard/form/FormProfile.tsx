"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import Button from "@/app/components/ui/button/Button";
import Input from "@/app/components/ui/form/Input";

import type { ProfileFormState } from "@/app/(memorybook)/memorybook/types/formState";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileFormType } from "../../../types/formType";

type FormProfileProps = {
  buttonName: string;
  formAction: (
    state: ProfileFormState,
    data: FormData
  ) => Promise<ProfileFormState>;
  userEmail: string | undefined;
  userName: string | undefined;
};

const FormProfile: React.FC<FormProfileProps> = ({
  buttonName,
  formAction,
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormType>({
    mode: "onBlur",
  });

  const initialState = {
    message: null,
    errors: { name: undefined, email: undefined },
  };

  const [state, dispatch] = useFormState<ProfileFormState, FormData>(
    formAction,
    initialState
  );

  const onSubmit: SubmitHandler<ProfileFormType> = (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      dispatch(formData);
    } catch (error) {
      console.error("プロフィール変更中にエラーが発生しました:", error);
      toast.error("プロフィール変更中にエラーが発生しました。" + error);
    }
  };

  useEffect(() => {
    if (state.message === "edit") {
      toast.success("プロフィールを編集しました！");
      state.message = "";
      router.replace("/memorybook/");
    }
  }, [state.message]);

  return (
    <>
      <h2 className="bg-itinerary-heading">プロフィール</h2>
      <div className="flex items-center justify-center">
        <div className="w-full border py-4 px-6 border-itinerary-borderGray rounded bg-white max-w-[620px]">
          <p className="text-center border-b pb-4 border-itinerary-borderGray font-semibold">
            プロフィール
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full py-3">
            <Input
              name="name"
              label="名前(ニックネーム)"
              placeholder="名前(ニックネーム)を記載してください。"
              register={register}
              required={true}
              error={errors.name?.message || state.errors?.name}
            />
            <Input
              type="email"
              name="email"
              label="メールアドレス"
              placeholder="メールアドレスを記載してください。"
              register={register}
              required={true}
              pattern="email"
              error={errors.email?.message || state.errors?.email}
            />
            {state.message && state.message !== "edit" && (
              <p className="text-red-500">{state.message}</p>
            )}
            <Button color="blue" size="normal" className="rounded mt-4">
              {buttonName}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormProfile;
