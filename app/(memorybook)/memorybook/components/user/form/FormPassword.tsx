"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { signOut } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { useModal } from "@/app/hooks/useModal";
import { updatePassword } from "../../../action/actionProfile";
import Input from "@/app/components/ui/form/Input";
import FormLayout from "../../layout/FormLayout";

import { passwordSchema } from "../../../schema/userSchema";
import type { PasswordFormState } from "@/app/(memorybook)/memorybook/types/formState";
import type { passwordFormType } from "@/app/(memorybook)/memorybook/types/formType";

type FormPasswordProps = {
  modalId?: string;
};

const FormPassword: React.FC<FormPasswordProps> = ({ modalId }) => {
  const { closeModal } = useModal();

  const {
    register,
    formState: { errors },
  } = useForm<passwordFormType>({
    mode: "onBlur",
    resolver: zodResolver(passwordSchema),
  });

  const modalLayout = modalId ? true : false;

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

  useEffect(() => {
    if (state.message === "success") {
      toast.success("パスワードを変更しました！ログアウトが実行されます。");

      if (modalId) {
        closeModal(modalId);
      }

      state.message = "";
      signOut({ callbackUrl: "/memorybook" });
    }
  }, [state.message, closeModal, modalId]);

  return (
    <FormLayout
      formTitle="パスワードのフォーム"
      buttonName="変更する"
      action={dispatch}
      modalLayout={modalLayout}
    >
      <Input
        label="パスワード（登録済みのパスワード）"
        name="password"
        type="password"
        placeholder="登録済みのパスワードを確認の為記載してください。"
        register={register}
        error={errors.password?.message || state.errors?.password}
      />
      <Input
        label="パスワード（新しいパスワード）"
        name="newPassword"
        type="password"
        placeholder="変更する新しいパスワードを記載してください。"
        register={register}
        error={errors.newPassword?.message || state.errors?.newPassword}
      />
      <Input
        label="パスワード（新しいパスワード確認用）"
        name="passwordConfirmation"
        type="password"
        placeholder="確認の為パスワードをもう一度記載してください。"
        register={register}
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
