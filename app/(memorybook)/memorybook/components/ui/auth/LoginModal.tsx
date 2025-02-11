"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "@/app/components/ui/form/Input";
import Button from "@/app/components/ui/button/Button";

import type { LoginFormType } from "../../../types/formType";

const LoginModal = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    mode: "onBlur",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      const result = await signIn("itinerary", {
        ...data,
        redirect: false,
      });

      if (!result?.error) {
        toast.success("ログインしました！");
        toggleModal();
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

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", {
        redirect: false,
      });

      if (!result?.error) {
        toast.success("ログインしました！");
        toggleModal();
        router.replace(`/memorybook/dashboard`);
      } else {
        toast.error("エラーが発生しました。" + result.error);
        setErrorMessage(result.error);
      }
    } catch (error) {
      console.error("Googleログイン中にエラーが発生:", error);
      toast.error("Googleログイン中にエラーが発生しました。" + error);
    }
  };

  return (
    <>
      <p onClick={toggleModal} className="cursor-pointer mb-0">
        ログイン
      </p>
      {isModalOpen &&
        createPortal(
          <div
            onClick={closeModal}
            className="fixed flex z-[200] justify-center items-center w-full h-full top-0 left-0 bg-gray-500 bg-opacity-90"
          >
            <div
              className="relative w-full max-w-[400px] mx-2 p-4 border rounded border-gray-500 bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-center border-b pb-4 border-itinerary-borderGray font-semibold">
                ログインフォーム
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="w-full py-3">
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
                <Button color="blue" size="auth" className="rounded mt-6">
                  ログイン
                </Button>
              </form>
              <Button
                onClick={handleGoogleSignIn}
                color="blue"
                size="auth"
                className="rounded mb-6"
              >
                Googleでログイン
              </Button>
              <Button
                onClick={toggleModal}
                color="gray"
                size="normal"
                className="rounded"
              >
                閉じる
              </Button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default LoginModal;
