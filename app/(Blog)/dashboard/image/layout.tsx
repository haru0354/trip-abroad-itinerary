import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "画像ライブラリー",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
  {children}</>;
}
