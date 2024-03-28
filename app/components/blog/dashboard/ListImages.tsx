import Image from "next/image";
import Link from "next/link";

import { getPostImages } from "../../lib/BlogServiceMany";

const ListImages = async () => {
  const images = await getPostImages();
  
  const sortedImages = images.sort((a,b) => b.id - a.id)

  return (
    <div className="flex flex-wrap w-full">
      {sortedImages.map((image) => {
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
  );
};

export default ListImages;
