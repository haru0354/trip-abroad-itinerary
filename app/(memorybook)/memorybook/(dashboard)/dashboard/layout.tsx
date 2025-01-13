import { Suspense } from "react";
import { Metadata } from "next";
import { getCurrentUserId } from "@/app/lib/getCurrentUser";
import { getItineraryHomes } from "@/app/(memorybook)/memorybook/lib/memoryBookService";
import SideMenu from "../../components/dashboard/side-menu/SideMenu";
import Loading from "@/app/Loading";

const brandTItle = process.env.NEXT_PUBLIC_ITINERARY_BRAND_TITLE;

export const metadata: Metadata = {
  title: {
    default: "旅行の一覧",
    template: `%s | ${brandTItle}`,
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
          <SideMenu itineraryHomes={itineraryHomes} />
        </Suspense>
      </div>
    </>
  );
}
