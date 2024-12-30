import Image from "next/image";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";

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
    <>
      <div className="flex w-full my-8 flex-wrap items-center justify-center">
        <AnimatedItem
          elementType="div"
          animation="fadeInVariants"
          className="my-6 flex flex-col  items-center max-w-[320px] min-w-[320px] rounded"
        >
          <div className="min-h-[222px] max-h-[222px] border justify-centers">
            <figure
              style={{
                position: "relative",
                width: "320px",
                height: "220px",
              }}
            >
              <Image
                src={image1Url}
                alt={image1Alt}
                fill
                sizes="(max-hight: 220px)"
                style={{
                  objectFit: "cover",
                }}
              />
            </figure>
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
          delay={0.3}
          className="rounded my-6 flex flex-col mx-0 md:mx-8 items-center max-w-[320px] min-w-[320px]"
        >
          <div className="min-h-[222px] max-h-[222px] border justify-centers">
            <figure
              style={{
                position: "relative",
                width: "320px",
                height: "220px",
              }}
            >
              <Image
                src={image2Url}
                alt={image2Alt}
                fill
                sizes="(max-hight: 220px)"
                style={{
                  objectFit: "cover",
                }}
              />
            </figure>
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
          delay={0.6}
          className="my-6 flex flex-col items-center max-w-[320px] min-w-[320px] rounded"
        >
          <div className="min-h-[222px] max-h-[222px]  border justify-centers">
            <figure
              style={{
                position: "relative",
                width: "320px",
                height: "220px",
              }}
            >
              <Image
                src={image3Url}
                alt={image3Alt}
                fill
                sizes="(max-hight: 220px)"
                style={{
                  objectFit: "cover",
                }}
              />
            </figure>
          </div>
          <div className="min-h-[130px] ">
            <h3 className="text-gray-700 my-6 text-center text-xl font-semibold">
              {title3}
            </h3>
            <p className="text-gray-600 my-2">{content3} </p>
          </div>
        </AnimatedItem>
      </div>
    </>
  );
};

export default Section3ColumnImage;
