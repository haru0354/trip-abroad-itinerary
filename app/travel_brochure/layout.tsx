import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import AuthContext from "../context/AuthContext";
import getCurrentUser from "../action/getCurrentUser";
import ToastContext from "../context/ToastContext";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "国内旅行・海外旅行の旅程表作成しおりアプリ「旅のメモリーブック」",
    template: "%s | 旅のメモリーブック",
  },


};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <>
      <AuthContext>
          <ToastContext />
          {children}
      </AuthContext>
    </>
  );
}
