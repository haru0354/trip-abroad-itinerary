import type { Metadata } from "next";
import { blogBrandTitle } from "@/app/(blog)/config/blogConfig";

export const metadata: Metadata = {
  title: {
    default: "記事の一覧",
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
