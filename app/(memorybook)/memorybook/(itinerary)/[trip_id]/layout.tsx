import { Metadata } from "next";

import FooterMenu from "../../components/layout/footer/FooterMenu";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";

export const metadata: Metadata = {
  robots: {
    index: false,
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { trip_id: string };
}>) {
  const tripId = params.trip_id;

  return (
    <>
      <Header />
      <main className="bg-itinerary-bgColor">
        <div className="main-contents-area">
          <div className="px-1 md:px-8 w-full">{children}</div>
        </div>
      </main>
      <Footer />
      <FooterMenu tripId={tripId} />
    </>
  );
}
