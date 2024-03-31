import { Metadata } from "next";
import DashboardItinerarySideMenu from "@/app/components/itineraryHome/DashboardItinerarySideMenu";
import { Suspense } from "react";

import { getCurrentUserId } from "@/app/components/lib/getCurrentUser";
import { getItineraryHomes } from "@/app/components/lib/MemoryBookService";
import Loading from "@/app/loading";

export const metadata: Metadata = {
  title: {
    default: "旅行の一覧",
    template: "%s | 旅のメモリーブック",
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
  const currentUserId = (await getCurrentUserId()) ?? undefined;
  const itineraryHomes = await getItineraryHomes(currentUserId);

  return (
    <>
      <div className="flex bg-sky-50">
        <div className="flex justify-center items-center mx-auto w-full max-w-[1200px] ml-0 sm:ml-96 bg-white border rounded border-gray-200 p-5 mt-8">
          <div className="w-full">{children}</div>
        </div>
        <Suspense fallback={<Loading />}>
          <DashboardItinerarySideMenu itineraryHomes={itineraryHomes} />
        </Suspense>
      </div>
    </>
  );
}
