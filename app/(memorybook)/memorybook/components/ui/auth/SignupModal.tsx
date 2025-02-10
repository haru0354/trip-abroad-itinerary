"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

import { useModal } from "@/app/hooks/useModal";
import Modal from "@/app/components/ui/modal/Modal";
import Input from "@/app/components/ui/form/Input";
import Button from "@/app/components/ui/button/Button";

type SignupModalProps = {
  textButton?: boolean;
};

const SignupModal: React.FC<SignupModalProps> = ({ textButton = false }) => {
  const router = useRouter();
  const { closeModal } = useModal();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await axios.post("/api/signup", {
        name,
        email,
        password,
      });

      if (res.status === 200) {
        toast.success("アカウントを作成しました！");

        await signIn("itinerary", {
          name,
          email,
          password,
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
      <p className="text-center border-b pb-4 border-itinerary-borderGray font-semibold">
        アカウント作成
      </p>
      <form onSubmit={onSubmit} className="w-full py-3">
        <Input
          label="ニックネーム"
          name="name"
          placeholder="メモの見出しを記載しましょう。"
        />
        <Input
          label="メールアドレス"
          name="email"
          placeholder="メモの見出しを記載しましょう。"
        />
        <Input
          type="password"
          label="パスワード"
          name="password"
          placeholder="メモの見出しを記載しましょう。"
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Button color="blue" size="normal" className="rounded mt-4">
          アカウント作成
        </Button>
      </form>
    </Modal>
  );
};

export default SignupModal;
