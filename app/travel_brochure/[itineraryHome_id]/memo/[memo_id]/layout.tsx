import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "個別のメモ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
  {children}</>;
}
