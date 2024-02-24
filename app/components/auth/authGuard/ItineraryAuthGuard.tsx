import { redirect } from "next/navigation";
import { User } from "@prisma/client";

type AuthGuardContextProps = {
  children: React.ReactNode;
  currentUser:  User | null;
};

const ItineraryAuthGuard: React.FC<AuthGuardContextProps> = async ({
  children,
  currentUser
}) => {
  const session = currentUser;

  if (session) {
    return <>{children}</>;
  } else {
    redirect("/travel_brochure");
  }
};

export default ItineraryAuthGuard;
