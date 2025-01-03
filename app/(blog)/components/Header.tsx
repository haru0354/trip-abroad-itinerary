import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  isTopPage?: boolean;
};

const Header: React.FC<HeaderProps> = ({ isTopPage }) => {
  return (
    <>
      <header>
        <div className="flex items-center justify-center">
          <Link href="/">
            {isTopPage ? (
              <h1>
                <Image
                  src="/logo_blog.png"
                  alt="英語なしで最高の海外旅行の思い出を作る「トラベルメモリー」"
                  width={350}
                  height={90}
                  priority
                  className="w-[220px] h-auto md:w-[350px]"
                />
              </h1>
            ) : (
              <Image
                src="/logo_blog.png"
                alt="英語なしで最高の海外旅行の思い出を作る「トラベルメモリー」"
                width={350}
                height={90}
                priority
                className="w-[220px] h-auto md:w-[350px]"
              />
            )}
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
