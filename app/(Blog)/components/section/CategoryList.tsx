import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/app/(blog)/lib/service/blogServiceMany";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";
import Section from "@/app/components/layout/Section";

const CategoryList = async () => {
  const categories = await getCategories("postsAndPostImage");

  return (
    <Section bgColor="bg-white" name="カテゴリ">
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
                <div className="flex flex-col items-center max-w-[330px] min-w-[330px] mx-5 my-6 rounded hover:bg-blog-hoverBlue transition duration-300">
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
                  <div className="px-3 py-1 w-full min-h-[170px]">
                    <h3 className="text-gray-700 my-3 text-center text-xl font-semibold">
                      {category.name && category.name.length > 12 ? (
                        <>{category.name.slice(0, 12)}...</>
                      ) : (
                        <>{category.name}</>
                      )}
                    </h3>
                    <p>
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
    </Section>
  );
};

export default CategoryList;
