import Link from "next/link";
import prisma from "../lib/prisma";
import Image from "next/image";

const ListImages = async () => {
  const images = await prisma.postImage.findMany();

  return (
    <>
      <div className="flex flex-wrap w-full">
        {images.map((image) => {
          return (
            <Link href={`/home/image/${image.id}`}>
              <div key={image.id} className="mx-4 my-4">
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
