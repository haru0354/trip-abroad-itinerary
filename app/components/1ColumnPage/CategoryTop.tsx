import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/app/(blog)/lib/service/blogServiceMany";
import AnimatedItem from "../lib/AnimatedItem";

const CategoryTop = async () => {
  const categories = await getCategories("postsAndPostImage")

  return (
    <div className="flex w-full my-8 flex-wrap items-center justify-center">
      {categories.map((category) => {
        if (
          !category ||
          ((!category.title || category.title === "") &&
            category.posts.every((post) => !post.draft))
        ) {
          return null;
        }
        return (
          <AnimatedItem
            elementType="div"
            animation="fadeInVariants"
            key={category.id}
            className="flex flex-col items-center"
          >
            <Link href={`/${category.slug}`}>
              <div className=" rounded mx-5 my-6 flex flex-col items-center  max-w-[330px] min-w-[330px]">
                <div className="min-h-[222px] max-h-[222px] border justify-centers">
                  {category.postImage ? (
                    <figure
                      style={{
                        position: "relative",
                        width: "330px",
                        height: "220px",
                      }}
                    >
                      <Image
                        src={category.postImage.url}
                        alt={category.postImage.altText}
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
                <div className="px-3 py-1 min-h-[180px]">
                  <h3 className="text-gray-700 my-6 text-center text-xl font-semibold">
                    {category.name && category.name.length > 12 ? (
                      <>{category.name.slice(0, 12)}...</>
                    ) : (
                      <>{category.name}</>
                    )}
                  </h3>
                  <p className="text-gray-600 my-2">
                    {category.description &&
                    category.description.length > 56 ? (
                      <>{category.description.slice(0, 56)}...</>
                    ) : (
                      <>{category.description}</>
                    )}
                  </p>
                </div>
              </div>
            </Link>
          </AnimatedItem>
        );
      })}
    </div>
  );
};

export default CategoryTop;
