import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "国内旅行・海外旅行の旅程表作成しおりアプリ「旅のメモリーブック」",
    template: "%s | 旅のメモリーブック",
  },
  description:
    "国内旅行・海外の旅行の旅程表を簡単に作成できるしおりアプリが「旅のメモリーブック」です。PC・スマホ・タブレットに対応しており、無料で利用が可能です。また、SNSの共有・同行者の友人・社員旅行など複数の人と旅程が共有可能。写真をアップロードすれば旅の思い出を作れるようになります",
};

export default async function RootLayout({
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
