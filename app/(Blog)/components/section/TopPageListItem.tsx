import AnimatedItem from "@/app/lib/animation/AnimatedItem";
import Image from "next/image";
import Link from "next/link";

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
      className="flex flex-col items-center"
    >
      <Link href={href}>
        <div className="flex flex-col items-center max-w-[330px] min-w-[330px] mx-5 my-6 rounded hover:bg-blog-hoverBlue transition duration-300">
          <div className="min-h-[222px] max-h-[222px] border">
            {imageUrl && altText ? (
              <figure
                style={{
                  position: "relative",
                  width: "330px",
                  height: "220px",
                }}
              >
                <Image
                  src={imageUrl}
                  alt={altText}
                  fill
                  sizes="(max-hight: 220px)"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </figure>
            ) : (
              <figure
                style={{
                  position: "relative",
                  width: "330px",
                  height: "220px",
                }}
              >
                <Image
                  src="/no_image.jpg"
                  alt="画像の準備中"
                  fill
                  sizes="(max-hight: 220px)"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </figure>
            )}
          </div>
          <div className="min-h-[80px] px-3">
            <h3 className="my-3 text-center text-xl font-semibold">
              {title.length > 12 ? <>{title.slice(0, 12)}...</> : <>{title}</>}
            </h3>
          </div>
        </div>
      </Link>
    </AnimatedItem>
  );
};

export default TopPageListItem;
