import ItineraryAuthGuard from "@/app/components/auth/authGuard/ItineraryAuthGuard";
import getCurrentUser from "@/app/action/getCurrentUser";
import FooterMenu from "@/app/components/FooterMenu";
import prisma from "@/app/components/lib/prisma";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { itineraryHome_id: string; itinerary_id: string };
}>) {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;
  const itineraryId = Number(params.itinerary_id);
  const itineraryHomeId = Number(params.itineraryHome_id);
  let itinerary = null;
  
  if (itineraryId) {
    const itinerary = await prisma.itinerary.findUnique({
      where: {
        id: itineraryId,
      },
    });
  }

  return (
    <>
      <ItineraryAuthGuard currentUser={currentUser}>
        {children}
        <FooterMenu
          itineraryHomeId={itineraryHomeId}
          userId={userId}
          itinerary={itinerary}
        />
      </ItineraryAuthGuard>
    </>
  );
}
