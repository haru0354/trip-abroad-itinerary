import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "英語なしで最高の海外旅行の思い出を作る「トラベルメモリー」",
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
