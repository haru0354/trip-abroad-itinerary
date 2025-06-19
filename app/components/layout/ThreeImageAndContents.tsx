import Image from "next/image";

import AnimatedItem from "@/app/lib/animation/AnimatedItem";

type ThreeImageAndContentsProps = {
  items: Item[];
};

type Item = {
  title: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
};

const ThreeImageAndContents: React.FC<ThreeImageAndContentsProps> = ({
  items,
}) => {
  return (
    <div className="flex w-full my-8 flex-wrap items-center justify-center">
      {items.map((item, index) => {
        return (
          <AnimatedItem
            key={item.title}
            elementType="div"
            animation="fadeInVariants"
            className="flex flex-col items-center w-[320px] my-6 mx-4"
            delay={0.2 * (index + 1)}
          >
            <div className="h-[222px] border justify-centers">
              <figure
                style={{
                  position: "relative",
                  width: "320px",
                  height: "220px",
                }}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-height: 220px)"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </figure>
            </div>
            <div className="min-h-[130px] ">
              <h3 className="my-6 text-center text-xl font-semibold">
                {item.title}
              </h3>
              <p className="my-2">{item.content}</p>
            </div>
          </AnimatedItem>
        );
      })}
    </div>
  );
};

export default ThreeImageAndContents;
