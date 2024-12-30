import Image from "next/image";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";

type Section1ColumnRightProps = {
  src: string;
  alt: string;
  isPriority?: boolean;
  name: string;
  content: string;
  content2?: string;
  content3?: string;
};

const Section1ColumnRight: React.FC<Section1ColumnRightProps> = ({
  src,
  alt,
  isPriority,
  name,
  content,
  content2,
  content3,
}) => {
  return (
    <>
      <AnimatedItem
        elementType="h3"
        animation="fadeInVariants"
        className="text-gray-700 my-6 w-[80%] flex justify-center pb-2 text-xl md:text-2xl font-semibold border-b text-center border-sky-700 border-dashed mx-auto"
      >
        {name}
      </AnimatedItem>
      <AnimatedItem
        elementType="div"
        animation="fadeInVariants"
        className="flex justify-center w-full py-1 md:py-4 mb-4 rounded flex-wrap"
      >
        <div className="w-full flex justify-center items-center py-4 max-w-[400px]">
            <Image
              src={src}
              alt={alt}
              width={360}
              height={260}
              style={{
                width: "365px",
                height: "auto",
              }}
              priority={isPriority}
              className="border border-gray-200"
            />
        </div>
        <div className="w-full py-2 md:py-8 md:mx-6 max-w-[400px] justify-center items-center">
          <p className="text-gray-700 mb-6">{content}</p>
          <p className="text-gray-700 mb-6">{content2}</p>
          <p className="text-gray-700 mb-6">{content3}</p>
        </div>
      </AnimatedItem>
    </>
  );
};

export default Section1ColumnRight;
