import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "未公開記事一覧",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
