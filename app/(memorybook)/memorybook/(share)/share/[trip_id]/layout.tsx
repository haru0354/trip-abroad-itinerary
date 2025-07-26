import Header from "@/app/(memorybook)/memorybook/components/layout/header/Header";
import Footer from "@/app/(memorybook)/memorybook/components/layout/footer/Footer";
import MainContainer from "@/app/components/layout/MainContainer";
import BackToTopButton from "@/app/components/ui/button/BackToTopButton";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1 px-2">
        <MainContainer itineraryPage={true}>
          <div className="w-full px-1 md:px-4">{children}</div>
        </MainContainer>
        <BackToTopButton />
      </main>
      <Footer isTopAppDirectory={true} />
    </>
  );
}
