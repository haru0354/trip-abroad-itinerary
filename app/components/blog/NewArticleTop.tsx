import Link from "next/link";
import prisma from "../lib/prisma";
import Image from "next/image";

const NewArticleTop = async () => {
  const posts = await prisma.post.findMany({
    take: 6,
    include: {
      category: true,
      postImage: true,
    },
  });

  return (
    <>
      <h3 className="bg-sky-600 text-white font-bold text-lg px-2 py-4 rounded-sm">
        新着記事
      </h3>
      <div className="flex w-full my-8 flex-wrap items-center justify-center">
        {posts.map((post) => {
          return (
            <>
              <div key={post.id} className="flex flex-col items-center">
                <Link href={`/${post.category.slug}/${post.slug}`}>
                  <div className=" rounded mx-5 my-6 flex flex-col items-center  max-w-[330px] min-w-[330px]">
                    <div className="min-h-[220px] max-h-[220px]  justify-centers">
                      {post.postImage ? (
                        <Image
                          src={post.postImage.url}
                          alt={post.postImage.altText}
                          width={330}
                          height={220}
                        />
                      ) : (
                        <Image
                          src="/008.jpg"
                          alt="aa"
                          width={330}
                          height={220}
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
            </>
          );
        })}
      </div>
    </>
  );
};

export default NewArticleTop;
