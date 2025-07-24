import Image from "next/image";
import Link from "next/link";

import { itinerarySiteTItle } from "../../../config/itineraryConfig";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";

type FooterProps = {
  isTopAppDirectory?: boolean;
};

const Footer: React.FC<FooterProps> = ({ isTopAppDirectory }) => {
  return (
    <>
      <AnimatedItem
        elementType="div"
        animation="fadeInOpacity"
      >
        <Image
          alt="飛行機で旅行の画像"
          src="/footer-image.png"
          width={1000}
          height={370}
          className="mx-auto"
          sizes="(max-width: 768px) 100vw, 1000px"
        />
      </AnimatedItem>
      <footer className={`${isTopAppDirectory || "mb-[64px]"}`}>
        <div className="flex flex-col items-center justify-center bottom-0 w-full min-h-[68px] bg-blue-500">
          <ul className="flex flex-col md:flex-row text-center my-2 text-xs">
            <li className="mx-6 py-1 md:py-0 text-white hover:text-sky-100">
              <Link href="/privacypolicy">プライバシーポリシー・免責事項</Link>
            </li>
            <li className="mx-6 py-1 md:py-0 text-white hover:text-sky-100">
              <Link href="/sitemaps">サイトマップ</Link>
            </li>
          </ul>
          <span className="px-2 py-1 text-center text-xs text-black">
            &copy; {itinerarySiteTItle}
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
