import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "メモ帳アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
  {children}</>;
}
