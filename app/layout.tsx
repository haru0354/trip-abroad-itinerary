import type { Metadata } from "next";

import "./globals.css";
import { notoSansJp } from "./util/font";
import { siteTitle } from "./(blog)/config/blogConfig";

const siteDescription = process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION;

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
