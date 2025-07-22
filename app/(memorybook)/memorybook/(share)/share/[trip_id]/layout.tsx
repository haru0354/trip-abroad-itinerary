import Header from "@/app/(memorybook)/memorybook/components/layout/header/Header";
import Footer from "@/app/(memorybook)/memorybook/components/layout/footer/Footer";
import MainContainer from "@/app/components/layout/MainContainer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1 px-2 bg-itinerary-bgColor">
        <MainContainer>
          <div className="w-full px-1 md:px-4">{children}</div>
        </MainContainer>
      </main>
      <Footer isTopAppDirectory={true} />
    </>
  );
}
