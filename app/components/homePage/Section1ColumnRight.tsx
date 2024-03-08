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

      <div className="flex justify-center w-full py-4 mb-4 rounded flex-wrap">
      <h3 className="text-gray-700 mb-6 w-[75%] py-2 text-2xl font-semibold border-b border-sky-700 text-center">
        {name}
      </h3>
        <div className="w-full flex justify-center items-center py-4  max-w-[400px] ">
          <Image
            src={src}
            alt={alt}
            width={360}
            height={261}
            style={{
              width: "360px",
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
