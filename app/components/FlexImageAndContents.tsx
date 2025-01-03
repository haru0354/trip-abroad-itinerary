import Image from "next/image";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";

type FlexImageAndContentsProps = {
  src: string;
  alt: string;
  name: string;
  contents: string[];
  imageLeft?: boolean;
  isPriority?: boolean;
};

const FlexImageAndContents: React.FC<FlexImageAndContentsProps> = ({
  src,
  alt,
  name,
  contents,
  imageLeft = true,
  isPriority = false,
}) => {
  return (
    <div>
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
        className={`flex justify-center w-full py-1 md:py-4 mb-4 rounded flex-wrap ${
          imageLeft ? "flex-row" : "flex-row-reverse"
        }`}
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
          {contents.map((content) => (
            <p key={content} className="text-gray-700 mb-6">
              {content}
            </p>
          ))}
        </div>
      </AnimatedItem>
    </div>
  );
};

export default FlexImageAndContents;
