import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "旅程表",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
  {children}</>;
}
