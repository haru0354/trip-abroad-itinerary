import { Metadata } from "next";
import { blogBrandTitle } from "@/app/(blog)/config/blogConfig";

export const metadata: Metadata = {
  title: {
    default: "カテゴリの一覧",
    template: `%s | ${blogBrandTitle}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
