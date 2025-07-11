import type { Metadata } from "next";

import "./globals.css";
import { notoSansJp } from "./util/font";
import { blogDescription, blogTitle } from "./(blog)/config/blogConfig";

export const metadata: Metadata = {
  title: `${blogTitle}`,
  description: `${blogDescription}`,
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
