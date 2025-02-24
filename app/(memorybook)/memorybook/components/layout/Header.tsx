import Link from "next/link";
import Image from "next/image";

import { getCurrentUserId } from "@/app/lib/getCurrentUser";
import { itinerarySiteTItle } from "../../config/itineraryConfig";
import Menu from "../ui/menu/Menu";

const Header = async () => {
  const currentUserId = await getCurrentUserId();

  return (
    <header className="w-full bg-itinerary-bgColor">
      <div className="max-w-[1120px] mx-auto">
        <div className="flex justify-between items-center mx-2 h-16">
          <Link href="/memorybook">
            <h1>
              <Image
                src="/logo_itinerary.png"
                alt={itinerarySiteTItle || "サイトタイトルが未設定"}
                width="220"
                height="52"
                priority
                className="w-[160px] h-auto md:w-[220px] "
              />
            </h1>
          </Link>
          <Menu currentUserId={currentUserId} />
        </div>
      </div>
    </header>
  );
};

export default Header;
