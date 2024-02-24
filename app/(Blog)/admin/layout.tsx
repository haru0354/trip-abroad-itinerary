import AuthContext from "@/app/context/AuthContext";
import ToastContext from "@/app/context/ToastContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン画面",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthContext>
        <ToastContext />
        {children}
      </AuthContext>
    </>
  );
}
