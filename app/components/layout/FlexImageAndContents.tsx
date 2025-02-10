import Image from "next/image";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";
import Link from "next/link";
import Button from "@/app/components/ui/button/Button";

type FlexImageAndContentsProps = {
  src: string;
  alt: string;
  name: string;
  contents: string[];
  buttonText?: string;
  buttonHref?: string;
  imageLeft?: boolean;
  isPriority?: boolean;
};

const FlexImageAndContents: React.FC<FlexImageAndContentsProps> = ({
  src,
  alt,
  name,
  contents,
  buttonText,
  buttonHref,
  imageLeft = true,
  isPriority = false,
}) => {
  return (
    <AnimatedItem elementType="div" animation="fadeInVariants">
      <h3 className="my-6 w-[80%] flex justify-center pb-2 text-xl md:text-2xl font-semibold border-b text-center border-itinerary-borderBlack border-dashed mx-auto">
        {name}
      </h3>
      <div
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
            className="border border-itinerary-borderGray"
          />
        </div>
        <div className="w-full py-2 md:py-8 md:mx-6 max-w-[400px] justify-center items-center">
          {contents.map((content) => (
            <p key={content} className="mb-6">
              {content}
            </p>
          ))}
        </div>
      </div>
      {buttonText && buttonHref && (
        <Link href={buttonHref}>
          <Button color="blue" size="normal">
            {buttonText}
          </Button>
        </Link>
      )}
    </AnimatedItem>
  );
};

export default FlexImageAndContents;
