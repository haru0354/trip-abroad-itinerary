import Image from "next/image";
import AnimatedItem from "../lib/AnimatedItem";

type Section3ColumnImageProps = {
  title1: string;
  title2: string;
  title3: string;
  content1: string;
  content2: string;
  content3: string;
  image1Url: string;
  image2Url: string;
  image3Url: string;
  image1Alt: string;
  image2Alt: string;
  image3Alt: string;
};

const Section3ColumnImage: React.FC<Section3ColumnImageProps> = ({
  title1,
  title2,
  title3,
  content1,
  content2,
  content3,
  image1Url,
  image2Url,
  image3Url,
  image1Alt,
  image2Alt,
  image3Alt,
}) => {
  return (
    <div className="flex w-full my-8 flex-wrap items-center justify-center">
      <AnimatedItem
        elementType="div"
        animation="fadeInVariants"
        className="flex flex-col items-center mx-3 max-w-[310px] min-w-[310px]"
      >
        <div className="min-h-[220px] max-h-[220px] border justify-centers">
          <Image
            src={image1Url}
            alt={image1Alt}
            width={310}
            height={221}
            style={{
              width: "310px",
              height: "auto",
            }}
          />
        </div>
        <div className="min-h-[130px] ">
          <h3 className="text-gray-700 my-6 text-center text-xl font-semibold">
            {title1}
          </h3>
          <p className="text-gray-600 my-2">{content1}</p>
        </div>
      </AnimatedItem>
      <AnimatedItem
        elementType="div"
        animation="fadeInVariants"
        className="rounded mx-5 my-6 flex flex-col items-center  max-w-[310px] min-w-[310px]"
      >
        <div className="min-h-[220px] max-h-[220px] border justify-centers">
          <Image
            src={image2Url}
            alt={image2Alt}
            width={310}
            height={221}
            style={{
              width: "310px",
              height: "auto",
            }}
          />
        </div>
        <div className="min-h-[130px] ">
          <h3 className="text-gray-700 my-6 text-center text-xl font-semibold">
            {title2}
          </h3>
          <p className="text-gray-600 my-2">{content2}</p>
        </div>
      </AnimatedItem>
      <AnimatedItem
        elementType="div"
        animation="fadeInVariants"
        className=" rounded mx-5 my-6 flex flex-col items-center  max-w-[310px] min-w-[310px]"
      >
        <div className="min-h-[220px] max-h-[220px]  border  justify-centers">
          <Image src={image3Url} alt={image3Alt} width={310} height={221} />
        </div>
        <div className="min-h-[130px] ">
          <h3 className="text-gray-700 my-6 text-center text-xl font-semibold">
            {title3}
          </h3>
          <p className="text-gray-600 my-2">{content3} </p>
        </div>
      </AnimatedItem>
    </div>
  );
};

export default Section3ColumnImage;
