import ItineraryAuthGuard from "@/app/components/auth/authGuard/ItineraryAuthGuard";
import getCurrentUser from "@/app/action/getCurrentUser";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const currentUser = await getCurrentUser();

  return (
    <>
      <ItineraryAuthGuard currentUser={currentUser}>
        {children}
      </ItineraryAuthGuard>
    </>
  );
}
