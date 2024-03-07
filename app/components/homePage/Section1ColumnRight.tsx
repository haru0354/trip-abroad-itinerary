import Image from "next/image";

type Section1ColumnRightProps = {
  src: string;
  alt: string;
  name: string;
  content: string;
  content2?: string;
  content3?: string;
};

const Section1ColumnRight: React.FC<Section1ColumnRightProps> = ({
  src,
  alt,
  name,
  content,
  content2,
  content3,
}) => {
  return (
    <>
      <h3 className="text-gray-700 mb-6 py-2 text-2xl font-semibold border-b border-gray-600 text-center">
        {name}
      </h3>
      <div className="flex justify-center  w-full py-4  rounded flex-wrap">
        <div className="w-full flex justify-center items-center py-4  max-w-[400px] ">
          <Image
            src={src}
            alt={alt}
            width={350}
            height={253}
            style={{
              width: "350px",
              height: "auto",
            }}
          />
        </div>
        <div className="w-full py-4 mx-14 max-w-[400px] justify-center items-center">
          <p className="text-gray-700 mb-6">{content}</p>
          <p className="text-gray-700 mb-6">{content2}</p>
          <p className="text-gray-700 mb-6">{content3}</p>
        </div>
      </div>
    </>
  );
};

export default Section1ColumnRight;
