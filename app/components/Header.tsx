import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className="bg-[#eff6ff] py-10  ">
        <div className="flex items-center justify-center border-b border-sky-800 pb-8">
          <Link href="/">
            <h1>
              <Image
                src="/top.JPG"
                alt="サイトタイトルに変更する"
                width={250}
                height={70}
                priority
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </h1>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
