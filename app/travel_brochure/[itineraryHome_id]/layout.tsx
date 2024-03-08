import ItineraryAuthGuard from "@/app/components/auth/authGuard/ItineraryAuthGuard";
import getCurrentUser from "@/app/action/getCurrentUser";
import FooterMenu from "@/app/components/FooterMenu";
import HeaderItinerary from "@/app/components/HeaderItinerary";
import FooterItinerary from "@/app/components/FooterItinerary";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { itineraryHome_id: string };
}>) {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;
  const itineraryHomeId = Number(params.itineraryHome_id);

  return (
    <>
      <ItineraryAuthGuard currentUser={currentUser}>
        <HeaderItinerary currentUser={currentUser} />
        {children}
        <FooterItinerary/>
        <FooterMenu itineraryHomeId={itineraryHomeId} userId={userId} />
      </ItineraryAuthGuard>
    </>
  );
}
