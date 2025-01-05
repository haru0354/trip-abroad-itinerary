"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import Modal from "./Modal";
import useSignupModal from "@/app/components/auth/hooks/useSignupModal";
import useLoginModal from "../../../hooks/useLoginModal";
import AuthInput from "@/app/(memorybook)/memorybook/components/ui/auth/AuthInput";
import Button from "@/app/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, { message: "2文字以上入力する必要があります。" }),
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z.string().min(6, { message: "6文字以上入力する必要があります。" }),
});

const SignupModal = () => {
  const router = useRouter();
  const signupModal = useSignupModal();
  const loginModal = useLoginModal();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onToggle = useCallback(() => {
    signupModal.onClose();
    loginModal.onOpen();
  }, [signupModal, loginModal]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      // アカウントの作成
      const res = await axios.post("../../../api/signup", data);

      if (res.status === 200) {
        toast.success("アカウントを作成しました！");
      }

      //　ログイン
      await signIn("itinerary", {
        ...data,
        callbackUrl: "/memorybook/dashboard",
      });

      signupModal.onClose();
      router.refresh();
    } catch (error) {
      toast.error("エラーが発生しました。" + error);
    } finally {
      setLoading(false);
    }
  };

  // モーダルの内容
  const bodyContent = (
    <div>
      <AuthInput
        id="name"
        label="ニックネーム"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
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
          className="text-center text-gray-600 pt-2 cursor-pointer "
        >
          ログインする
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      isOpen={signupModal.isOpen}
      title="アカウント作成"
      primaryLabel="アカウント作成"
      onClose={signupModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default SignupModal;
