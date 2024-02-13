import Image from "next/image";

type Section1ColumnLeftProps = {
  src: string;
  alt: string;
  name: string;
  content: string;
};

const Section1ColumnLeft: React.FC<Section1ColumnLeftProps> = ({
  src,
  alt,
  name,
  content,
}) => {
  return (
    <>
      <div className="flex justify-center  w-full  my-20 py-16 border border-sky-600 bg-white rounded flex-wrap">
      <div className="w-full py-4 mx-14 max-w-[400px] justify-center items-center">
          <h3 className="text-gray-700 mb-6 text-2xl font-semibold ">
            {name}
          </h3>
          <p className="text-gray-700 mb-6">{content}a</p>
        </div>
        <div className="w-full flex justify-center items-center py-4  max-w-[400px] ">
          <Image
            src={src}
            alt={alt}
            width={350}
            height={250}
            objectFit="contain"
          />
        </div>
      </div>
    </>
  );
};

export default Section1ColumnLeft;
