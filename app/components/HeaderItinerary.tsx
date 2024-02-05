import Link from "next/link";
import { User } from "@prisma/client";

type HeaderItineraryProps = {
  currentUser: User | null
}

const HeaderItinerary: React.FC<HeaderItineraryProps> = ({ currentUser }) => {

  return (
    <header>
      <div className="flex justify-between items-center border-b h-16 mx-10">
        <Link href="../">HOME </Link>
        <ul className="flex">
          <li className="ml-4">
            <Link href="/">ログイン</Link>
          </li>
          <li className="ml-4">
            <Link href="../itinerary">itinerary</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default HeaderItinerary;
