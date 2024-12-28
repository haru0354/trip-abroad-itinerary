import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "画像ライブラリー",
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
