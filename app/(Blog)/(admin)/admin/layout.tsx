import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン画面",
  robots: {
    index: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
