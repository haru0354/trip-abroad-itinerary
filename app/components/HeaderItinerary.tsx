import Link from "next/link";
import { User } from "@prisma/client";
import Menu from "./auth/navigation/Menu";
import Image from "next/image";

type HeaderItineraryProps = {
  currentUser: User | null;
};

const HeaderItinerary: React.FC<HeaderItineraryProps> = ({ currentUser }) => {
  return (
    <header className="max-w-[1120px] mx-auto">
      <div className="flex justify-between items-center mx-2 h-16">
        <Link href="/memorybook">
          <h1>
            <Image
              src="/logo_itinerary.png"
              alt="国内旅行・海外旅行の旅程表作成しおりアプリ「旅のメモリーブック」"
              width="220"
              height="52"
              priority
            />
          </h1>
        </Link>
        <Menu currentUser={currentUser} />
      </div>
    </header>
  );
};

export default HeaderItinerary;
