import type { Metadata } from "next";

import "./globals.css";
import { notoSansJp } from "./util/font";
import { siteDescription, siteTitle } from "./(blog)/config/blogConfig";

export const metadata: Metadata = {
  title: `${siteTitle}`,
  description: `${siteDescription}`,
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
