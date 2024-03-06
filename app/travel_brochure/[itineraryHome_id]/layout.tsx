import ItineraryAuthGuard from "@/app/components/auth/authGuard/ItineraryAuthGuard";
import getCurrentUser from "@/app/action/getCurrentUser";
import FooterMenu from "@/app/components/FooterMenu";
import prisma from "@/app/components/lib/prisma";
import { addMemo } from "@/app/action/action-memo";
import { addItinerary } from "@/app/action/action-itinerary";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { itineraryHome_id: string };
}>) {
  const currentUser = await getCurrentUser();
  const itineraryHomeId = Number(params.itineraryHome_id);

  return (
    <>
      <ItineraryAuthGuard currentUser={currentUser}>
        {children}
        <FooterMenu itineraryHomeId={itineraryHomeId}/>
      </ItineraryAuthGuard>
    </>
  );
}
