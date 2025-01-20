import { Metadata } from "next";
import Header from "@/app/(memorybook)/memorybook/components/layout/Header";
import Footer from "@/app/(memorybook)/memorybook/components/layout/Footer";

export const metadata: Metadata = {
  title: "共有された旅行記",
  robots: {
    index: false,
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
      <Footer isTopAppDirectory={true} />
    </>
  );
}
