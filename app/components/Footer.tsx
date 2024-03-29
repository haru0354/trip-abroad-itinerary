import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="bg-blue-50 ">
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
      <footer>
        <div className="bg-blue-500 min-h-[68px] w-full flex flex-grow bottom-0 items-end justify-center">
          <ul className="text-xs text-center mb-3">
            <li className="mb-2 text-white">
              <Link href="/privacypolicy">プライバシーポリシー・免責事項</Link>
            </li>
            <li className="text-black">
              &copy;英語なしで最高の海外旅行の思い出を作る「トラベルメモリー」
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
