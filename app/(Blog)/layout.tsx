import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "国内旅行・海外旅行のしおりアプリ「旅のメモリーブック」",
    template: "%s | ブログタイトル",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
  {children}</>;
}
