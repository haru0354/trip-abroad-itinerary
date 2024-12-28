import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "記事の一覧",
    template: "%s | トラベルメモリー",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
