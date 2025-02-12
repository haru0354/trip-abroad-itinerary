"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import Button from "@/app/components/ui/button/Button";
import Input from "@/app/components/ui/form/Input";

import type { PasswordFormState } from "@/app/(memorybook)/memorybook/types/formState";
import { SubmitHandler, useForm } from "react-hook-form";
import { passwordFormType } from "../../../types/formType";
import FormLayout from "../../layout/FormLayout";

type FormPasswordProps = {
  buttonName: string;
  formAction: (
    state: PasswordFormState,
    data: FormData
  ) => Promise<PasswordFormState>;
};

const FormPassword: React.FC<FormPasswordProps> = ({
  buttonName,
  formAction,
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<passwordFormType>({
    mode: "onBlur",
  });

  const initialState = {
    message: null,
    errors: { password: undefined, passwordConfirmation: undefined },
  };

  const [state, dispatch] = useFormState<PasswordFormState, FormData>(
    formAction,
    initialState
  );

  const onSubmit: SubmitHandler<passwordFormType> = (data) => {
    try {
      const formData = new FormData();
      formData.append("password", data.password);
      formData.append("passwordConfirmation", data.passwordConfirmation);
      dispatch(formData);
    } catch (error) {
      console.error("パスワードの変更中にエラーが発生しました:", error);
      toast.error("パスワードの変更中にエラーが発生しました。" + error);
    }
  };

  useEffect(() => {
    if (state.message === "edit") {
      toast.success("パスワードを編集しました！");
      state.message = "";
      router.replace("/memorybook/dashboard/profile");
    }
  }, [state.message]);

  return (
    <>
      <h2 className="bg-itinerary-heading">パスワードの変更</h2>
      <FormLayout>
        <p className="text-center border-b pb-4 border-itinerary-borderGray font-semibold">
          パスワード
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full py-3">
          <Input
            label="パスワード"
            name="password"
            type="password"
            placeholder="変更するパスワードを記載してください。"
            register={register}
            required={true}
            minLength={6}
            error={errors.password?.message || state.errors?.password}
          />
          <Input
            label="パスワード（確認用）"
            name="passwordConfirmation"
            type="password"
            placeholder="確認の為パスワードをもう一度記載してください。"
            register={register}
            required={true}
            minLength={6}
            error={
              errors.passwordConfirmation?.message ||
              state.errors?.passwordConfirmation
            }
          />
          {state.errors && state.message !== "edit" && (
            <p className="text-red-500">{state.message}</p>
          )}
          <Button color="blue" size="normal" className="rounded mt-4">
            {buttonName}
          </Button>
        </form>
      </FormLayout>
    </>
  );
};

export default FormPassword;
