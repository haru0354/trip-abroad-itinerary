"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

import { useModal } from "@/app/hooks/useModal";
import { updateEmail } from "../../../action/actionProfile";
import FormLayout from "../../layout/FormLayout";
import Input from "@/app/components/ui/form/Input";

import type { ChangeEmailState } from "@/app/(memorybook)/memorybook/types/formState";
import type { ChangeEmailFormType } from "@/app/(memorybook)/memorybook/types/formType";

type FormEmailProps = {
  modalId?: string;
};

const FormEmail: React.FC<FormEmailProps> = ({ modalId }) => {
  const { closeModal } = useModal();
  const {
    register,
    formState: { errors },
  } = useForm<ChangeEmailFormType>({
    mode: "onBlur",
  });

  const modalLayout = modalId ? true : false;

  const initialState = {
    message: null,
    errors: {
      email: undefined,
      emailConfirmation: undefined,
      password: undefined,
    },
  };

  const [state, dispatch] = useFormState<ChangeEmailState, FormData>(
    updateEmail,
    initialState
  );

  useEffect(() => {
    if (state.message === "success") {
      toast.success("メールアドレスが変更しました！ログアウトが実行されます。");

      if (modalId) {
        closeModal(modalId);
      }

      state.message = "";
      signOut({ callbackUrl: "/memorybook" });
    }
  }, [state.message]);

  return (
    <FormLayout
      formTitle="メールアドレスのフォーム"
      buttonName="変更する"
      action={dispatch}
      modalLayout={modalLayout}
    >
      <Input
        type="email"
        name="email"
        label="メールアドレス"
        placeholder="変更したいメールアドレスを記載してください。"
        register={register}
        required={true}
        pattern="email"
        error={errors.email?.message || state.errors?.email}
      />
      <Input
        type="email"
        name="emailConfirmation"
        label="メールアドレス（確認用）"
        placeholder="確認の為メールアドレスをもう一度記載してください。"
        register={register}
        required={true}
        pattern="email"
        error={
          errors.emailConfirmation?.message || state.errors?.emailConfirmation
        }
      />
      <Input
        label="パスワード"
        name="password"
        type="password"
        placeholder="登録しているパスワードを記載してください。"
        register={register}
        required={true}
        minLength={6}
        error={errors.password?.message || state.errors?.password}
      />
      {state.message && state.message !== "success" && (
        <p className="text-red-500">{state.message}</p>
      )}
    </FormLayout>
  );
};

export default FormEmail;
