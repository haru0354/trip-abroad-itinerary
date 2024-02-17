import Image from "next/image";
import Link from "next/link";

const SideTop = () => {
  return (
    <>
      <div className="hover:bg-gray-200 mb-4">
        <Link href="/travel_brochure">
          <Image
            src="/new-article.JPG"
            alt="削除する"
            width={240}
            height={140}
          />
          <p className="my-2 text-center">海外旅行のしおりアプリ</p>
        </Link>
      </div>
    </>
  );
};

export default SideTop;
