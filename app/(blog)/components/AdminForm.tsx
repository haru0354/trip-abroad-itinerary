"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Form from "@/app/components/ui/Form";
import Button from "@/app/components/ui/Button";

const AdminForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const result = await signIn("blog", {
      redirect: false,
      username,
      password,
    });

    if (!result?.error) {
      toast.success("ログインしました！");
      router.replace(`/dashboard/`);
    } else {
      setErrorMessage(result.error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center bg-sky-50">
        <div className="w-[350px] border p-4 my-10 border-gray-400 rounded bg-white">
          <h2 className="text-center text-base border-b py-1 my-1 bg-white border-gray-400 text-gray-600 font-semibold">
            ログインフォーム
          </h2>
          <div className="flex">
            <form onSubmit={handleLogin} className="w-full">
              <Form
                label="ユーザー名"
                name="username"
                placeholder="ユーザー名"
              />
              <Form
                label="パスワード"
                name="password"
                placeholder="パスワード"
                type="password"
              />
              {errorMessage && (
                <p className="text-red-500 pt-4">{errorMessage}</p>
              )}
              <Button color="blue" size="auth" className="rounded mt-4">
                ログイン
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminForm;
