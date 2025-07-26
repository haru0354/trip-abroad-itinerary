import "./globals.css";
import { notoSansJp } from "./util/font";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJp.className} min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
