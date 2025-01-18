"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import Modal from "./Modal";
import useSignupModal from "../../../hooks/useSignupModal";
import useLoginModal from "../../../hooks/useLoginModal";
import AuthInput from "@/app/(memorybook)/memorybook/components/ui/auth/AuthInput";
import Button from "@/app/components/ui/Button";

const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z.string().min(6, { message: "6文字以上入力する必要があります。" }),
});

const LoginModal = () => {
  const router = useRouter();
  const signupModal = useSignupModal();
  const loginModal = useLoginModal();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onToggle = useCallback(() => {
    loginModal.onClose();
    signupModal.onOpen();
  }, [loginModal, signupModal]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      const res = await signIn("itinerary", {
        ...data,
        redirect: false,
      });

      if (res?.error) {
        toast.error("エラーが発生しました。" + res.error);
        setErrorMessage(res.error);
        return;
      }

      toast.success("ログインしました！");
      loginModal.onClose();
      router.replace(`/memorybook/dashboard`);
    } catch (error) {
      toast.error("エラーが発生しました。" + error);
    } finally {
      setLoading(false);
    }
  };

  const bodyContent = (
    <div>
      <AuthInput
        id="email"
        label="メールアドレス"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <AuthInput
        id="password"
        label="パスワード"
        type="password"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      {errorMessage && <p className="text-red-500 pt-4 px-4">{errorMessage}</p>}
    </div>
  );

  const footerContent = (
    <div className="w-full px-4 my-6 ">
      <Button
        onClick={() =>
          signIn("google", {
            callbackUrl: "/memorybook/dashboard",
          })
        }
        color="gray"
        size="auth"
        className=" rounded mt-4"
      >
        Googleでログイン
      </Button>

      <div className="my-8 border-t border-dashed border-gray-600">
        <p
          onClick={onToggle}
          className="text-center pt-2 cursor-pointer "
        >
          アカウントを作成する
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      isOpen={loginModal.isOpen}
      title="ログイン"
      primaryLabel="ログイン"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
