import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/app/(blog)/lib/service/blogServiceMany";
import AnimatedItem from "../lib/AnimatedItem";

const NewArticleTop = async () => {
  const posts = await getPosts("categoryAndPostImage", 6, );

  return (
    <div className="flex w-full my-8 flex-wrap items-center justify-center">
      {posts.map((post) => {
        return (
          post.draft && (
            <AnimatedItem
              elementType="div"
              animation="fadeInVariants"
              key={post.id}
              className="flex flex-col items-center"
            >
              <Link href={`/${post.category.slug}/${post.slug}`}>
                <div className=" rounded mx-5 my-6 flex flex-col items-center  max-w-[330px] min-w-[330px]">
                  <div className="min-h-[222px] max-h-[222px] border justify-centers">
                    {post.postImage ? (
                      <figure
                        style={{
                          position: "relative",
                          width: "330px",
                          height: "220px",
                        }}
                      >
                        <Image
                          src={post.postImage.url}
                          alt={post.postImage.altText}
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
                          sizes="(max-hight: 222px)"
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      </figure>
                    )}
                  </div>
                  <div className="px-3 min-h-[130px] ">
                    <h3 className="text-gray-700 my-6 text-center text-xl font-semibold">
                      {post.title && post.title.length > 34 ? (
                        <>{post.title.slice(0, 34)}...</>
                      ) : (
                        <>{post.title}</>
                      )}
                    </h3>
                  </div>
                </div>
              </Link>
            </AnimatedItem>
          )
        );
      })}
    </div>
  );
};

export default NewArticleTop;
