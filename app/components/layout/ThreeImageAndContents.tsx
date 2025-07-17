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
    <div className="grid grid-cols-1  md:grid-cols-3 gap-8 md:gap-10 w-full my-4 md:my-8">
      {items.map((item, index) => {
        return (
          <AnimatedItem
            key={item.title}
            elementType="div"
            animation="fadeInVariants"
            className="w-full h-full"
            delay={0.2 * (index + 1)}
          >
            <Image
              src={item.imageUrl}
              alt={item.imageAlt}
              width={350}
              height={240}
              className="border border-itinerary-borderGray mx-auto"
            />
            <h3 className="my-4 md:my-6 text-center text-xl font-semibold">
              {item.title}
            </h3>
            <p>{item.content}</p>
          </AnimatedItem>
        );
      })}
    </div>
  );
};

export default ThreeImageAndContents;
