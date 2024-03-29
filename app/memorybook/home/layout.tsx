import { Metadata } from "next";
import DashboardItinerarySideMenu from "@/app/components/itineraryHome/DashboardItinerarySideMenu";

import getCurrentUser from "@/app/action/getCurrentUser";
import { getItineraryHomes } from "@/app/components/lib/MemoryBookService";

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
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;
  const itineraryHomes = await getItineraryHomes(userId)


  return (
    <>
        <div className="flex bg-sky-50">
          <DashboardItinerarySideMenu itineraryHomes={itineraryHomes} />
          <div className="flex justify-center items-center mx-auto w-full max-w-[1200px] ml-0 sm:ml-96 bg-white border rounded border-gray-200 p-5 mt-8">
            <div className="w-full">{children}</div>
          </div>
        </div>
    </>
  );
}
