import Link from "next/link";

type FooterItineraryProps = {
  isTopAppDirectory?: boolean;
};

const FooterItinerary: React.FC<FooterItineraryProps> = ({
  isTopAppDirectory,
}) => {
  return (
    <footer className="bg-blue-400 mx-auto">
      <div className="flex items-center justify-center pt-4">
        <ul>
          <li className="text-xs text-blue-800">
            <Link href="/privacypolicy">プライバシーポリシー・免責事項</Link>
          </li>
        </ul>
      </div>
      <div
        className={`flex items-center justify-center ${
          isTopAppDirectory || "mb-[65px]"
        }`}
      >
        <p className="text-xs py-2 h-4">
          &copy;国内旅行・海外旅行のしおりアプリ「旅のメモリーブック」
        </p>
      </div>
    </footer>
  );
};

export default FooterItinerary;
