import Link from "next/link";
import Image from "next/image";
import { getCurrentUserId } from "@/app/(memorybook)/memorybook/lib/getCurrentUser";
import Menu from "./ui/menu/Menu";

const HeaderItinerary = async () => {
  const currentUserId = await getCurrentUserId();

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
              className="w-[160px] h-auto md:w-[220px] "
            />
          </h1>
        </Link>
        <Menu currentUser={currentUserId} />
      </div>
    </header>
  );
};

export default HeaderItinerary;
