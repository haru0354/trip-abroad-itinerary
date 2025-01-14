import type { Metadata } from "next";

const brandTItle = process.env.NEXT_PUBLIC_WEBSITE_BRAND_TITLE;

export const metadata: Metadata = {
  title: {
    default: "カテゴリの一覧",
    template: `%s | ${brandTItle}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
