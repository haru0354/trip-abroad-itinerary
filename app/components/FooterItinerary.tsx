import Image from "next/image";
import Link from "next/link";

type FooterItineraryProps = {
  isTopAppDirectory?: boolean;
};

const FooterItinerary: React.FC<FooterItineraryProps> = ({
  isTopAppDirectory,
}) => {
  return (
    <footer
      className={`flex flex-col-reverse bg-blue-50 bg-center bg-no-repeat  w-full h-[500px]  ${
        isTopAppDirectory || "mb-[65px]"
      }`}
      style={{ backgroundImage: "url('/footer-image.png')" }}
    >
      <div className="bg-blue-500 h-[65px] w-full flex items-end justify-center">
        <ul className="text-xs text-center mb-3">
          <li className="mb-2 text-blue-800">
            <Link href="/privacypolicy">プライバシーポリシー・免責事項</Link>
          </li>
          <li className="">
            &copy;国内旅行・海外旅行のしおりアプリ「旅のメモリーブック」
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterItinerary;
