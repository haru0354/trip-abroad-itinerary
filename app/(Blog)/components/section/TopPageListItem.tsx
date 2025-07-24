import Image from "next/image";
import Link from "next/link";

import AnimatedItem from "@/app/lib/animation/AnimatedItem";

interface TopPageListItemProps {
  href: string;
  imageUrl?: string;
  altText?: string;
  title: string;
}

const TopPageListItem: React.FC<TopPageListItemProps> = ({
  href,
  imageUrl,
  altText,
  title,
}) => {
  return (
    <AnimatedItem
      elementType="div"
      animation="fadeInVariants"
      className="flex items-center justify-center"
    >
      <Link
        href={href}
        className="w-full  transition duration-300 transform hover:-translate-y-2 hover:bg-white hover:rounded-lg"
      >
        <div className="flex flex-col items-center hover:shadow-lg transition-all duration-300 max-h-[340px]">
          <div className="">
            <Image
              src={imageUrl ? imageUrl : "/no_image.jpg"}
              alt={altText ? altText : "画像の準備中"}
              width={330}
              height={215}
              className="mx-auto"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
          <div className="w-full my-3 p-2">
            <h3 className="text-center text-xl font-semibold">
              {title.length > 24 ? <>{title.slice(0, 24)}...</> : <>{title}</>}
            </h3>
          </div>
        </div>
      </Link>
    </AnimatedItem>
  );
};

export default TopPageListItem;
