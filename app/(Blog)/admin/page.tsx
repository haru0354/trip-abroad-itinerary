"use client";

import Form from "@/app/components/ui/Form";
import Button from "@/app/components/ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import toast from "react-hot-toast";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (
      e.currentTarget.elements.namedItem("username") as HTMLInputElement
    )?.value; // ユーザー名フィールドの値を取得
    const password = (
      e.currentTarget.elements.namedItem("password") as HTMLInputElement
    )?.value; // パスワードフィールドの値を取得
    const result = await signIn("app2", {
      redirect: false,
      username,
      password,
    });
    if (!result?.error) {
      // ログイン成功時の処理
      toast.success("ログインしました！");
      console.log("Login success:", result);
    } else {
      // ログイン失敗時の処理
      console.error("Login error:", result.error);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin" });
    toast.success("ログアウトしました！");
    console.log("Logged out");
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-[350px] border p-4 my-10 border-gray-400 rounded">
          <h2 className="text-center border-b pb-4 border-gray-400 text-gray-600 font-bold">
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
              <Button className="flex mx-auto items-center justify-center transition duration-300 my-6 w-[180px]  py-2 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900 rounded-sm">
                ログイン
              </Button>
            </form>
          </div>
          <div className="flex">
            <Button
              onClick={handleLogout}
              className="flex mx-auto justify-center transition duration-300 mb-6 w-[180px]  py-2 shadow font-bold bg-gray-700 text-white hover:bg-white hover:text-black border border-gray-900 rounded-sm"
            >
              ログアウト
            </Button>
          </div>
        </div>
      </div>
      <div>{session ? <div>ログイン中</div> : <div>未ログイン</div>}</div>
    </>
  );
};

export default page;
