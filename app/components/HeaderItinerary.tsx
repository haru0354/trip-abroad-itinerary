import Link from "next/link";
import { User } from "@prisma/client";
import Menu from "./auth/navigation/Menu";
import Image from "next/image";

type HeaderItineraryProps = {
  currentUser: User | null;
};

const HeaderItinerary: React.FC<HeaderItineraryProps> = ({ currentUser }) => {
  return (
    <header className="max-w-[76rem] mx-auto">
      <div className="flex justify-between items-center h-16 mx-10">
        <Link href="../">
          <Image
            src="/logo.JPG"
            alt="削除する"
            width={250}
            height={60}
            priority
            
          ></Image>
        </Link>
        <Menu currentUser={currentUser} />
      </div>
    </header>
  );
};

export default HeaderItinerary;
