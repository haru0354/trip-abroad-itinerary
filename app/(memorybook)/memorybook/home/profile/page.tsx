import { getCurrentUser } from "@/app/(memorybook)/memorybook/lib/getCurrentUser";
import ListProfile from "@/app/components/itineraryHome/ListProfile";

const page = async () => {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;
  const userName = currentUser?.name;
  const userEmail = currentUser?.email;

  return (
    <ListProfile
      userEmail={userEmail || undefined}
      userName={userName || undefined}
      userId={userId}
    />
  );
};

export default page;
