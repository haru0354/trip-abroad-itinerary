"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { signOut } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { deleteUser } from "../../../action/actionProfile";
import { useModal } from "@/app/hooks/useModal";
import Input from "@/app/components/ui/form/Input";
import FormLayout from "../../layout/FormLayout";

import { deleteUserSchema } from "../../../schema/userSchema";
import type { DeleteUserState } from "@/app/(memorybook)/memorybook/types/formState";
import type { DeleteUserFormType } from "@/app/(memorybook)/memorybook/types/formType";

type FormDeleteUserProps = {
  modalId?: string;
};

const FormDeleteUser: React.FC<FormDeleteUserProps> = ({ modalId }) => {
  const { closeModal } = useModal();
  const {
    register,
    formState: { errors },
  } = useForm<DeleteUserFormType>({
    mode: "onBlur",
    resolver: zodResolver(deleteUserSchema),
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

  const [state, dispatch] = useFormState<DeleteUserState, FormData>(
    deleteUser,
    initialState
  );

  useEffect(() => {
    if (state.message === "success") {
      toast.success("アカウントを削除しました！ログアウトが実行されます。");
      state.message = "";

      if (modalId) {
        closeModal(modalId);
      }

      signOut({ callbackUrl: "/memorybook" });
    }
  }, [state.message]);

  return (
    <FormLayout
      formTitle="アカウント削除のフォーム"
      buttonName="削除する"
      action={dispatch}
      modalLayout={modalLayout}
    >
      <Input
        label="パスワード"
        name="password"
        type="password"
        placeholder="登録済みのパスワードを記載してください。"
        register={register}
        error={errors.password?.message || state.errors?.password}
      />
      <Input
        label="パスワード（確認用）"
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

export default FormDeleteUser;
