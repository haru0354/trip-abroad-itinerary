"use client";

import Form from "@/app/components/ui/Form";
import Button from "@/app/components/ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

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
      console.log("Login success:", result);
    } else {
      // ログイン失敗時の処理
      console.error("Login error:", result.error);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/admin' });
    console.log("Logged out");
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-[350px] border p-4 my-10 border-gray-400">
          <h2 className="text-center border-b pb-4 border-gray-400 text-gray-600 font-bold">
            ログインフォーム
          </h2>
          <div>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <button type="submit">Login</button>
            </form>
            <button onClick={handleLogout}>ログアウト</button>
          </div>
        </div>
      </div>
      <div>{session ? <div>ログイン中</div> : <div>未ログイン</div>}</div>
    </>
  );
};

export default page;
