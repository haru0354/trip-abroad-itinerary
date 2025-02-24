import type { Metadata } from "next";
import { blogBrandTitle, siteTitle } from "../config/blogConfig";

export const metadata: Metadata = {
  title: {
    default: `${siteTitle}`,
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
