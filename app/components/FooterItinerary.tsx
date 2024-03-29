import Image from "next/image";
import Link from "next/link";

type FooterItineraryProps = {
  isTopAppDirectory?: boolean;
};

const FooterItinerary: React.FC<FooterItineraryProps> = ({
  isTopAppDirectory,
}) => {
  return (
    <>
      <div className="bg-blue-50 pt-8">
        <Image
          alt="飛行機で旅行の画像"
          src="/footer-image.png"
          width={1000}
          height={370}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
          className="block mx-auto"
        />
      </div>
      <footer className={`${isTopAppDirectory || "mb-[64px]"}`}>
        <div className="bg-blue-500 min-h-[68px] w-full flex flex-grow bottom-0 items-end justify-center">
          <ul className="text-xs text-center mb-3">
            <li className="mb-2 text-white">
              <Link href="/privacypolicy">プライバシーポリシー・免責事項</Link>
            </li>
            <li className="text-black">
              &copy;国内旅行・海外旅行のしおりアプリ「旅のメモリーブック」
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default FooterItinerary;
