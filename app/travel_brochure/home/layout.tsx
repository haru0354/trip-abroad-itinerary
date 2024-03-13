import ItineraryAuthGuard from "@/app/components/auth/authGuard/ItineraryAuthGuard";
import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from "@/app/components/lib/prisma";
import DashboardItinerarySideMenu from "@/app/components/itineraryHome/DashboardItinerarySideMenu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "旅行の一覧",
    template: "%s | 旅のメモリーブック",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;
  const itineraryHomes = await prisma.itineraryHome.findMany({
    where: {
      userId,
    },
  });

  return (
    <>
      <ItineraryAuthGuard currentUser={currentUser}>
        <div className="flex bg-sky-50">
          <DashboardItinerarySideMenu itineraryHomes={itineraryHomes} />
          <div className="flex justify-center items-center mx-auto w-full max-w-[1200px] ml-0 sm:ml-96 bg-white border rounded border-gray-200 p-5 mt-8">
            <div className="w-full">{children}</div>
          </div>
        </div>
      </ItineraryAuthGuard>
    </>
  );
}
