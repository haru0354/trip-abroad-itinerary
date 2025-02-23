import type { Metadata } from "next";

import Header from "../components/layout/blog/Header";
import Footer from "../components/layout/blog/Footer";

const brandTItle = process.env.NEXT_PUBLIC_WEBSITE_BRAND_TITLE;
const siteTItle = process.env.NEXT_PUBLIC_WEBSITE_TITLE;

export const metadata: Metadata = {
  title: {
    default: `${siteTItle}`,
    template: `%s | ${brandTItle}`,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="bg-sky-50">
        <div className="main-contents-area rounded">
          <div className="w-full px-1 md:px-4">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
