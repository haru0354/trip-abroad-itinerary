"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

import { useModal } from "@/app/hooks/useModal";
import Modal from "@/app/components/ui/modal/Modal";
import Input from "@/app/components/ui/form/Input";
import Button from "@/app/components/ui/button/Button";

import type { UserFormType } from "../../../types/formType";
import FormLayout from "../../layout/FormLayout";

type SignupModalProps = {
  textButton?: boolean;
};

const SignupModal: React.FC<SignupModalProps> = ({ textButton = false }) => {
  const router = useRouter();
  const { closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormType>({
    mode: "onBlur",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit: SubmitHandler<UserFormType> = async (data) => {
    try {
      const res = await axios.post("/api/signup", data);

      if (res.status === 200) {
        toast.success("アカウントを作成しました！");

        await signIn("itinerary", {
          ...data,
          redirect: false,
        });
      }

      closeModal();
      router.push("/memorybook/dashboard");
    } catch (error) {
      setErrorMessage("エラーが発生しました。もう一度お試しください。");
      toast.error("エラーが発生しました。" + error);
    }
  };

  return (
    <Modal
      maxWidth="max-w-[400px]"
      buttonName="しおりを作成"
      textButton={textButton}
    >
      <FormLayout
        formTitle="アカウント作成"
        buttonName="アカウント作成"
        buttonSize="auth"
        onSubmit={handleSubmit(onSubmit)}
        modalLayout={true}
      >
        <Input
          label="ニックネーム"
          name="name"
          placeholder="ニックネームを記載してください。"
          register={register}
          required
          error={errors.name?.message}
        />
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
    </Modal>
  );
};

export default SignupModal;
