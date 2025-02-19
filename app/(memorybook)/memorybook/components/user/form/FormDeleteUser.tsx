"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

import { updatePassword } from "../../../action/actionProfile";
import Input from "@/app/components/ui/form/Input";
import FormLayout from "../../layout/FormLayout";

import type { DeleteUserState } from "@/app/(memorybook)/memorybook/types/formState";
import type { DeleteUserFormType } from "@/app/(memorybook)/memorybook/types/formType";

const FormPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeleteUserFormType>({
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

  const [state, dispatch] = useFormState<DeleteUserState, FormData>(
    updatePassword,
    initialState
  );

  const onSubmit: SubmitHandler<DeleteUserFormType> = (data) => {
    try {
      const formData = new FormData();
      formData.append("password", data.password);
      formData.append("passwordConfirmation", data.passwordConfirmation);
      dispatch(formData);
    } catch (error) {
      console.error("アカウントの削除中にエラーが発生しました:", error);
      toast.error("アカウントの削除中にエラーが生しました。" + error);
    }
  };

  useEffect(() => {
    if (state.message === "success") {
      toast.success("アカウントを削除しました！ログアウトが実行されます。");
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
      {state.message && state.message !== "success" && (
        <p className="text-red-500">{state.message}</p>
      )}
    </FormLayout>
  );
};

export default FormPassword;
