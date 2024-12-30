import type { Metadata } from "next";
import "./globals.css";
import { notoSansJp } from "./util/font";

export const metadata: Metadata = {
  title: "英語なしで最高の海外旅行の思い出を作る「トラベルメモリー」",
  description:
    "海外旅行は記憶に残る最高の思い出になります。そのためにも必要となるのが旅行前の準備と当日の計画をしておくことです。特に英語が話せない人には必要なことでもあります。「トラベルメモリー」では初めての海外旅行や英語が話せない人向けに旅行計画の準備を紹介してます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJp.className}>{children}</body>
    </html>
  );
}
