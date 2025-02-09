"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import Form from "@/app/components/ui/Form";
import Button from "@/app/components/ui/Button";

const LoginModal = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

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
        toggleModal();
        router.replace(`/memorybook/dashboard`);
      } else {
        toast.error("エラーが発生しました。" + result.error);
        setErrorMessage(result.error);
      }
    } catch (error) {
      toast.error("ログイン中にエラーが発生しました。" + error);
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
