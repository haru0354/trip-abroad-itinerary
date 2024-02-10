"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import useSignupModal from "../hooks/useSignupModal";
import useLoginModal from "../hooks/useLoginModal";
import Modal from "./Modal";
import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import Button from "../../ui/Button";



// 入力データの検証ルールを定義
const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z.string().min(6, { message: "6文字以上入力する必要があります。" }),
});

const LoginModal = () => {
  const router = useRouter();
  const signupModal = useSignupModal();
  const loginModal = useLoginModal();
  const [loading, setLoading] = useState(false);

  // react hook formでフォームの状態を管理
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  const onToggle = useCallback(() => {
    loginModal.onClose();
    signupModal.onOpen();
  }, [loginModal, signupModal]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      // ログイン
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res?.error) {
        toast.error("エラーが発生しました。" + res.error);
        return;
      }

      toast.success("ログインしました！");
      loginModal.onClose();
      router.refresh();
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
    </div>
  );

  // フッターの内容
  const footerContent = (
    <div className="w-full px-4 my-6 ">
      <Button onClick={() => signIn("google")} className="border border-gray-400 p-1 w-full bg-white rounded-full">       
        Googleでログイン
      </Button>
      <div className="my-4 border-t">
        <p onClick={onToggle} className="text-center text-gray-500 text-sm pt-2 cursor-pointer ">アカウントを作成する</p>
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
