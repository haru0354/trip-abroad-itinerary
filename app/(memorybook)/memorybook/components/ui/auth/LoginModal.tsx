"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useModal } from "@/app/hooks/useModal";
import Modal from "@/app/components/ui/modal/Modal";
import FormLayout from "../../layout/FormLayout";
import Input from "@/app/components/ui/form/Input";
import GoogleLoginButton from "./GoogleLoginButton";

import type { LoginFormType } from "../../../types/formType";

const LoginModal = () => {
  const router = useRouter();
  const { closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    mode: "onBlur",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      const result = await signIn("itinerary", {
        ...data,
        redirect: false,
      });

      if (!result?.error) {
        toast.success("ログインしました！");
        closeModal("ログイン");
        router.replace(`/memorybook/dashboard`);
      } else {
        toast.error("エラーが発生しました。" + result.error);
        setErrorMessage(result.error);
      }
    } catch (error) {
      console.error("ログイン中にエラーが発生:", error);
      toast.error("ログイン中にエラーが発生しました。" + error);
    }
  };

  return (
    <Modal
      id="ログイン"
      maxWidth="max-w-[400px]"
      buttonName="ログイン"
      textButton={true}
    >
      <FormLayout
        formTitle="ログインフォーム"
        buttonName="ログイン"
        buttonSize="auth"
        onSubmit={handleSubmit(onSubmit)}
        modalLayout={true}
      >
        <Input
          type="email"
          label="メールアドレス"
          name="email"
          placeholder="メールアドレスを記載してください。"
          register={register}
          required
          error={errors.email?.message}
          pattern="email"
        />
        <Input
          type="password"
          label="パスワード"
          name="password"
          placeholder="パスワードを記載してください。"
          register={register}
          required
          minLength={6}
          error={errors.password?.message}
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </FormLayout>
      <GoogleLoginButton closeModal={() => closeModal("ログイン")} />
    </Modal>
  );
};

export default LoginModal;
