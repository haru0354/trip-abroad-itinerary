import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プロフィールの変更",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
  {children}</>;
}
