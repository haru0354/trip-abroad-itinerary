import prisma from "../lib/prisma";
import Image from "next/image";

const ImagesList = async () => {
  const images = await prisma.postImage.findMany();

  return (
    <>
      {images.map((image) => {
        return (
        <div key={image.id}>
                    <Image src={image.url} alt={image.altText} width={250} height={250} />

          <p>url:{image.url}</p>
          <p>alt:{image.altText}</p>
        </div>
        )
      })}
    </>
  );
};

export default ImagesList;
