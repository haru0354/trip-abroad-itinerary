import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-blue-400 mx-auto">
      <div className="flex items-center justify-center pt-4">
        <ul>
          <li className="text-xs text-blue-800">
            <Link href="/privacypolicy">プライバシーポリシー・免責事項</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-center">
      <p className="text-xs py-2 h-4">
          &copy;英語なしで最高の海外旅行の思い出を作る「トラベルメモリー」
        </p>
      </div>
    </footer>
  );
};

export default Footer;
