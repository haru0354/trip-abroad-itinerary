import getCurrentUser from "@/app/action/getCurrentUser";
import DashboardItinerarySideMenu from "@/app/components/itineraryHome/DashboardItinerarySideMenu";
import FormProfile from "@/app/components/itineraryHome/FormProfile";
import prisma from "@/app/components/lib/prisma";
import { updateProfile } from "@/app/action/action-profile";
import ListProfile from "@/app/components/itineraryHome/ListProfile";

const page = async () => {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;
  const userName = currentUser?.name;
  const userEmail = currentUser?.email;

  const itineraryHomes = await prisma.itineraryHome.findMany({
    where: {
      id: userId,
    },
  });

  return (

          <ListProfile  userEmail={userEmail || undefined} userName={userName || undefined} userId={userId}/>

  );
};

export default page;
