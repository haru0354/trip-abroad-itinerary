import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "画像の編集",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
