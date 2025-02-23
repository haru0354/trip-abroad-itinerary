import type { Metadata } from "next";
import { blogBrandTitle } from "../config/blogConfig";

const siteTItle = process.env.NEXT_PUBLIC_WEBSITE_TITLE;

export const metadata: Metadata = {
  title: {
    default: `${siteTItle}`,
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
