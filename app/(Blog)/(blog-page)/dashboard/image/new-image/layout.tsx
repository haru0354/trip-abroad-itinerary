import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "画像の追加",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
