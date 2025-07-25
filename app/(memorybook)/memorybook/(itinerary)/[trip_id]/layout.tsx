import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTrip } from "../../lib/memoryBookService";
import FooterMenu from "../../components/layout/footer/FooterMenu";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import MainContainer from "@/app/components/layout/MainContainer";

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
  const trip = await getTrip(tripId);

  if (!trip) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1 px-2">
        <MainContainer itineraryPage={true}>
          <div className="px-1 md:px-8 w-full">
            <h2 className="mt-0 md:mt-8 p-2 text-lg md:text-2xl text-center border-b border-solid text-black border-blue-800 bg-white">
              {trip?.name}
            </h2>
            {children}
          </div>
        </MainContainer>
      </main>
      <Footer />
      <FooterMenu tripId={tripId} />
    </>
  );
}
