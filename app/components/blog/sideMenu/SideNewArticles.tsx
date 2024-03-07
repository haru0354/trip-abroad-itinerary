import Link from "next/link";
import prisma from "../../lib/prisma";
import Image from "next/image";

const SideNewArticles = async () => {
  const posts = await prisma.post.findMany({
    take: 5,
    include: {
      category: true,
    },
  });

  return (
    <div className="w-full p-2">
      <h3 className="bg-blue-500 text-white font-bold text-lg px-2 py-4 rounded-sm">
        新着記事
      </h3>
      <ul>
        {posts.map((post) => {
          return (
            <li className="my-6 p-3 border-b border-gray-600 border-dashed hover:bg-gray-200">
              <Link href={`/${post.category.slug}/${post.slug}`}>
                <Image
                  src="/new-article.JPG"
                  alt="削除する"
                  width={280}
                  height={140}
                  className="block mx-auto"
                />
                {post.title && post.title.length > 36 ? (
                  <p className="text-gray-600 my-2">
                    {post.title.slice(0, 36)}...
                  </p>
                ) : (
                  <p className="text-gray-600 my-2">{post.title}</p>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideNewArticles;
