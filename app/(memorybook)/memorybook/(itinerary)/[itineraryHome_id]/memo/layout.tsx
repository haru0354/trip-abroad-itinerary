import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "メモ帳アプリ",
    template: "%s | 旅のメモリーブック",
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
