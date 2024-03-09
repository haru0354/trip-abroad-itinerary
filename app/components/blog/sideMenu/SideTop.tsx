import Image from "next/image";
import Link from "next/link";

const SideTop = () => {
  return (
    <>
      <div className="hover:bg-gray-200 mb-4">
        <Link href="/travel_brochure">
          <Image
            src="/travel_memory_thumbnail.jpg"
            alt="旅のメモリーブックのサムネイル"
            width={240}
            height={174}
            style={{
              width: "240px",
              height: "auto",
            }}
            className="block mx-auto"
          />
          <p className="my-2 text-center">海外旅行のしおりアプリ</p>
        </Link>
      </div>
    </>
  );
};

export default SideTop;
