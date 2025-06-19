import Image from "next/image";

import AnimatedItem from "@/app/lib/animation/AnimatedItem";
import ButtonNextLink from "../ui/button/ButtonNextLink";

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
    <AnimatedItem elementType="div" animation="fadeInVariants" className="mb-4">
      <h3 className="w-[80%] mx-auto my-6 pb-2 text-xl md:text-2xl text-center font-semibold border-b  border-dashed border-itinerary-borderBlack">
        {name}
      </h3>
      <div
        className={`flex justify-center w-full rounded flex-wrap ${
          imageLeft ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <div className="w-full flex justify-center items-center py-4 md:max-w-[400px]">
          <Image
            src={src}
            alt={alt}
            width={400}
            height={260}
            style={{
              width: "400",
              height: "auto",
            }}
            priority={isPriority}
            className="border border-itinerary-borderGray"
          />
        </div>
        <div className="w-full py-2 md:py-8 md:mx-8 md:max-w-[400px] justify-center items-center">
          {contents.map((content) => (
            <p key={content} className="mb-6">
              {content}
            </p>
          ))}
        </div>
      </div>
      {buttonText && buttonHref && (
        <div className="text-center">
          <ButtonNextLink href={buttonHref} className="rounded">
            {buttonText}
          </ButtonNextLink>
        </div>
      )}
    </AnimatedItem>
  );
};

export default FlexImageAndContents;
