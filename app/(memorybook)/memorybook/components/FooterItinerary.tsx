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
        <div className="bg-blue-500 min-h-[68px] w-full flex flex-col items-center justify-center bottom-0">
          <ul className="flex text-xs text-center">
            <li className="mx-6 text-white">
              <Link href="/privacypolicy">プライバシーポリシー・免責事項</Link>
            </li>
            <li className="mb-2 text-white">
              <Link href="/sitemaps">サイトマップ</Link>
            </li>
          </ul>
          <span className="text-xs text-black">
            &copy;国内旅行・海外旅行のしおりアプリ「旅のメモリーブック」
          </span>
        </div>
      </footer>
    </>
  );
};

export default FooterItinerary;
