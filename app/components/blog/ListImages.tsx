import Link from "next/link";
import prisma from "../lib/prisma";
import Image from "next/image";
import Button from "../ui/Button";

const ListImages = async () => {
  const images = await prisma.postImage.findMany();

  return (
    <>
      {images.map((image) => {
        return (
          <div key={image.id}>
            <Image
              src={image.url}
              alt={image.altText}
              width={200}
              height={100}
              style={{
                width: "300px",
                height: "auto",
              }}
            />
            <p>url:{image.url}</p>
            <p>alt:{image.altText}</p>
            <Link href={`/home/image/${image.id}`}>
              <Button className="min-w-[100px] px-6 py-1 shadow font-bold bg-gray-700 text-white hover:bg-white hover:text-black border border-sky-900">
                編集
              </Button>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default ListImages;
