import type { Metadata } from "next";

const brandTItle = process.env.NEXT_PUBLIC_ITINERARY_BRAND_TITLE;

export const metadata: Metadata = {
  title: {
    default: "プロフィール",
    template: `%s | ${brandTItle}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
  {children}</>;
}
