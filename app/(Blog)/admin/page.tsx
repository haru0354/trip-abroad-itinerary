"use client";

import Form from "@/app/components/ui/Form";
import Button from "@/app/components/ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";



const page = () => {
  const { data: session, status } = useSession();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (
      e.currentTarget.elements.namedItem("username") as HTMLInputElement
    )?.value; // ユーザー名フィールドの値を取得
    const password = (
      e.currentTarget.elements.namedItem("password") as HTMLInputElement
    )?.value; // パスワードフィールドの値を取得

    const result = await signIn("blog", {
      username,
      password,
      callbackUrl: "/dashboard",
    });

    if (!result?.error) {
      toast.success("ログインしました！");
    } else {
      setErrorMessage(result.error);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin" });
  };

  if (status === "loading") {
    return <div className="bg-sky-50">Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-center bg-sky-50">
        <div className="w-[350px] border p-4 my-10 border-gray-400 rounded bg-white">
          <h2 className="text-center text-base border-b py-1 my-1 bg-white border-gray-400 text-gray-600 font-bold">
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

export default page;
