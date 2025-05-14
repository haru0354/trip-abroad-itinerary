"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import Button from "@/app/components/ui/button/Button";

type GoogleLoginButtonProps = {
  closeModal?: () => void;
};

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  closeModal,
}) => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", {
        redirect: false,
      });

      if (!result?.error) {
        toast.success("ログインしました！");
        if (closeModal) {
          closeModal();
        }
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
      <Button
        onClick={handleGoogleSignIn}
        color="gray"
        size="auth"
        type="button"
        className="rounded mb-6"
      >
        Googleでログイン
      </Button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </>
  );
};

export default GoogleLoginButton;
