import prisma from "../lib/prisma";
import Image from "next/image";

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
                width: '300px',
                height: 'auto',
              }}
            />
            <p>url:{image.url}</p>
            <p>alt:{image.altText}</p>
          </div>
        );
      })}
    </>
  );
};

export default ListImages;
