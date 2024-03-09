import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className=" bg-[#eff6ff] pt-6  ">
        <div className="flex items-center justify-center">
          <Link href="/">
            <h1>
              <Image
                src="/logo_blog.png"
                alt="英語なしで最高の海外旅行の思い出を作る「トラベルメモリー」"
                width={350}
                height={90}
                priority
              />
            </h1>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
