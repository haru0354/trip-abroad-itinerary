"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import { useModal } from "@/app/hooks/useModal";
import Form from "@/app/components/ui/Form";
import Modal from "@/app/components/ui/Modal";
import Button from "@/app/components/ui/Button";

const LoginModal = () => {
  const router = useRouter();
  const { closeModal } = useModal();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result = await signIn("itinerary", {
        redirect: false,
        email,
        password,
      });

      if (!result?.error) {
        toast.success("ログインしました！");
        closeModal();
        router.replace(`/memorybook/dashboard`);
      } else {
        toast.error("エラーが発生しました。" + result.error);
        setErrorMessage(result.error);
      }
    } catch (error) {
      toast.error("ログイン中にエラーが発生しました。" + error);
    }
  };

  return (
    <Modal maxWidth="max-w-[400px]" buttonName="ログイン" textButton={true}>
      <p className="text-center border-b pb-4 border-itinerary-borderGray font-semibold">
        ログインフォーム
      </p>
      <form onSubmit={onSubmit} className="w-full py-3">
        <Form
          label="メールアドレス"
          name="email"
          placeholder="メモの見出しを記載しましょう。"
        />
        <Form
          type="password"
          label="パスワード"
          name="password"
          placeholder="メモの見出しを記載しましょう。"
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Button color="blue" size="normal" className="rounded mt-4">
          ログイン
        </Button>
      </form>
    </Modal>
  );
};

export default LoginModal;
