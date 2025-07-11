import type { Metadata } from "next";
import { blogBrandTitle, blogTitle } from "../config/blogConfig";

export const metadata: Metadata = {
  title: {
    default: `${blogTitle}`,
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
