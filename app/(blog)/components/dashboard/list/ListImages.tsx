import Image from "next/image";
import Link from "next/link";

import { getPostImages } from "@/app/(blog)/lib/service/blogServiceMany";
import HeadingTwo from "../../ui/dashboard/HeadingTwo";

const ListImages = async () => {
  const images = await getPostImages();

  return (
    <>
      <HeadingTwo>画像ライブラリー</HeadingTwo>
      <div className="flex flex-wrap w-full items-center justify-start">
        {images.map((image) => {
          return (
            <Link href={`/dashboard/image/${image.id}`} key={image.id}>
              <div className="mx-4 my-4">
                <Image
                  src={image.url}
                  alt={image.altText}
                  width={210}
                  height={100}
                  style={{
                    width: "240px",
                    height: "160px",
                  }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default ListImages;
