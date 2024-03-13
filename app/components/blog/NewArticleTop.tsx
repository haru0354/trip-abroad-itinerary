import Link from "next/link";
import prisma from "../lib/prisma";
import Image from "next/image";

const NewArticleTop = async () => {
  const posts = await prisma.post.findMany({
    take: 6,
    orderBy: {
      createdDate: "desc",
    },
    include: {
      category: true,
      postImage: true,
    },
  });
  return (
    <>
      <h2 className="bg-blue-400 text-xl font-semibold text-white text-center rounded my-10 p-5">
        新着記事
      </h2>
      <div className="flex w-full my-8 flex-wrap items-center justify-center">
        {posts.map((post) => {
          return (
            post.draft && (
              <div key={post.id} className="flex flex-col items-center">
                <Link href={`/${post.category.slug}/${post.slug}`}>
                  <div className=" rounded mx-5 my-6 flex flex-col items-center  max-w-[330px] min-w-[330px]">
                    <div className="min-h-[220px] max-h-[220px] border justify-centers">
                      {post.postImage ? (
                        <Image
                          src={post.postImage.url}
                          alt={post.postImage.altText}
                          width={330}
                          height={220}
                          style={{
                            width: "330px",
                            height: "auto",
                          }}
                        />
                      ) : (
                        <Image
                          src="/no_image.jpg"
                          alt="画像の準備中"
                          width={330}
                          height={220}
                          style={{
                            width: "330px",
                            height: "auto",
                          }}
                        />
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
              </div>
            )
          );
        })}
      </div>
    </>
  );
};

export default NewArticleTop;
