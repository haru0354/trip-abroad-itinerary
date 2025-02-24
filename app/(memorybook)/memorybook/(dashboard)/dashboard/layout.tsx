import { Suspense } from "react";
import { Metadata } from "next";

import { getTrips } from "@/app/(memorybook)/memorybook/lib/memoryBookService";
import { itineraryBrandTitle } from "../../config/itineraryConfig";
import DashboardSideMenu from "../../components/layout/side-menu/DashboardSideMenu";
import Loading from "@/app/Loading";

export const metadata: Metadata = {
  title: {
    default: "旅行の一覧",
    template: `%s | ${itineraryBrandTitle}`,
  },
  robots: {
    index: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const trips = await getTrips();

  return (
    <>
      <div className="flex bg-itinerary-bgColor min-h-screen">
        <div className="flex justify-center items-start mx-auto w-full max-w-[1200px] ml-0 sm:ml-96 bg-white border rounded border-itinerary-borderGray p-5 my-8">
          <div className="w-full">{children}</div>
        </div>
        <Suspense fallback={<Loading />}>
          <DashboardSideMenu trips={trips} />
        </Suspense>
      </div>
    </>
  );
}
