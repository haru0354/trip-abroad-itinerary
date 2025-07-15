import Header from "@/app/(memorybook)/memorybook/components/layout/header/Header";
import Footer from "@/app/(memorybook)/memorybook/components/layout/footer/Footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-itinerary-bgColor">
        <div className="main-contents-area rounded">
          <div className="w-full px-1 md:px-4">{children}</div>
        </div>
      </main>
      <Footer isTopAppDirectory={true} />
    </>
  );
}
