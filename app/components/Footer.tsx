import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="flex flex-col bg-blue-50 bg-center bg-no-repeat  w-full h-[500px] "
      style={{ backgroundImage: "url('/footer-image.png')" }}
    >
      <div className="flex-grow"></div>
      <div className="bg-blue-500 h-[65px] w-full flex items-end justify-center">
        <ul className="text-xs text-center mb-3">
          <li className="mb-2 text-blue-800">
            <Link href="/privacypolicy">プライバシーポリシー・免責事項</Link>
          </li>
          <li className="text-black">
            &copy;英語なしで最高の海外旅行の思い出を作る「トラベルメモリー」
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
