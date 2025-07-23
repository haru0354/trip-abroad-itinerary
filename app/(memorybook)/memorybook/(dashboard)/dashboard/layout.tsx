import { Metadata } from "next";
import { Suspense } from "react";

import { getTrips } from "@/app/(memorybook)/memorybook/lib/memoryBookService";
import DashboardSideMenu from "../../components/layout/side-menu/DashboardSideMenu";
import Loading from "@/app/Loading";

export const metadata: Metadata = {
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
    <main className="flex-1 px-2 bg-itinerary-bgColor">
      <div className="flex justify-center items-start w-full max-w-[1200px] ml-0 sm:ml-96 p-5 mx-auto my-8 border rounded bg-white border-itinerary-borderGray">
        <div className="w-full">{children}</div>
      </div>
      <Suspense fallback={<Loading />}>
        <DashboardSideMenu trips={trips} />
      </Suspense>
    </main>
  );
}
