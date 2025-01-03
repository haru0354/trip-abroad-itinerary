import Image from "next/image";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";

type ThreeImageAndContentsProps = {
  blocks: Block[];
};

type Block = {
  title: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
};

const ThreeImageAndContents: React.FC<ThreeImageAndContentsProps> = ({
  blocks,
}) => {
  return (
    <>
      <div className="flex w-full my-8 flex-wrap items-center justify-center">
        {blocks.map((block, index) => {
          return (
            <AnimatedItem
              key={block.title}
              elementType="div"
              animation="fadeInVariants"
              className="flex flex-col items-center max-w-[320px] min-w-[320px] my-6 mx-4"
              delay={0.3 * (index + 1)}
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
                    src={block.imageUrl}
                    alt={block.imageAlt}
                    fill
                    sizes="(max-height: 220px)"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </figure>
              </div>
              <div className="min-h-[130px] ">
                <h3 className="text-gray-700 my-6 text-center text-xl font-semibold">
                  {block.title}
                </h3>
                <p className="text-gray-600 my-2">{block.content}</p>
              </div>
            </AnimatedItem>
          );
        })}
      </div>
    </>
  );
};

export default ThreeImageAndContents;
