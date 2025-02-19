"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

import { updatePassword } from "../../../action/actionProfile";
import Input from "@/app/components/ui/form/Input";
import FormLayout from "../../layout/FormLayout";

import type { PasswordFormState } from "@/app/(memorybook)/memorybook/types/formState";
import type { passwordFormType } from "@/app/(memorybook)/memorybook/types/formType";

const FormPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<passwordFormType>({
    mode: "onBlur",
  });

  const initialState = {
    message: null,
    errors: {
      password: undefined,
      newPassword: undefined,
      passwordConfirmation: undefined,
    },
  };

  const [state, dispatch] = useFormState<PasswordFormState, FormData>(
    updatePassword,
    initialState
  );

  const onSubmit: SubmitHandler<passwordFormType> = (data) => {
    try {
      const formData = new FormData();
      formData.append("password", data.password);
      formData.append("newPassword", data.newPassword);
      formData.append("passwordConfirmation", data.passwordConfirmation);
      dispatch(formData);
    } catch (error) {
      console.error("パスワードの変更中にエラーが発生しました:", error);
      toast.error("パスワードの変更中にエラーが発生しました。" + error);
    }
  };

  useEffect(() => {
    if (state.message === "success") {
      toast.success("パスワードを変更しました！ログアウトが実行されます。");
      state.message = "";
      signOut({ callbackUrl: "/memorybook" });
    }
  }, [state.message]);

  return (
    <FormLayout
      formTitle="パスワードのフォーム"
      buttonName="変更する"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="パスワード（登録済みのパスワード）"
        name="password"
        type="password"
        placeholder="登録済みのパスワードを確認の為記載してください。"
        register={register}
        required={true}
        minLength={6}
        error={errors.password?.message || state.errors?.password}
      />
      <Input
        label="パスワード（新しいパスワード）"
        name="newPassword"
        type="password"
        placeholder="変更する新しいパスワードを記載してください。"
        register={register}
        required={true}
        minLength={6}
        error={errors.newPassword?.message || state.errors?.newPassword}
      />
      <Input
        label="パスワード（新しいパスワード確認用）"
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
      {state.errors && state.message !== "success" && (
        <p className="text-red-500">{state.message}</p>
      )}
    </FormLayout>
  );
};

export default FormPassword;
