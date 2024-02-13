import Image from "next/image";

type Section1ColumnProps = {
  src: string;
  alt: string;
  name: string;
  content: string;
};

const Section1Column: React.FC<Section1ColumnProps> = ({
  src,
  alt,
  name,
  content,
}) => {
  return (
    <>
      <div className="flex w-full my-20 border border-sky-600 bg-white rounded">
        <div className="w-[50%] flex justify-center  py-20">
          <Image
            src={src}
            alt={alt}
            width={350}
            height={250}
            objectFit="contain"
          />
        </div>
        <div className="w-[50%] py-20">
          <h2 className="text-gray-700 mb-6 text-2xl font-semibold ">
            {name}a
          </h2>
          <p className="text-gray-700 mb-6">{content}a</p>
        </div>
      </div>
    </>
  );
};

export default Section1Column;
