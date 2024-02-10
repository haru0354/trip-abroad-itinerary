import Link from "next/link";
import { User } from "@prisma/client";
import Menu from "./auth/navigation/Menu";

type HeaderItineraryProps = {
  currentUser: User | null
}

const HeaderItinerary: React.FC<HeaderItineraryProps> = ({ currentUser }) => {

  return (
    <header className="border-b">
      <div className="flex justify-between items-center h-16 mx-10">
        <Link href="../">HOME </Link>
        <Menu currentUser={currentUser} />
      </div>
    </header>
  );
};

export default HeaderItinerary;
