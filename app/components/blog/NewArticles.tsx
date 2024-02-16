import Link from "next/link";
import prisma from "../lib/prisma";
import Image from "next/image";

const NewArticles = async () => {
  const posts = await prisma.post.findMany();

  // 5件を取り出す
  const latestPosts = posts.slice(0, 5);

  return (
    <div className="w-full p-2">
      <h3 className="bg-green-600 text-white font-bold px-2 py-4">新着記事</h3>
      <ul>
        {latestPosts.map((post) => {
          return (
            <li className="my-6 pb-6 border hover:bg-gray-200">
              <Link href={`/${post.category}/${post.id}`}>
                <Image
                  src="/new-article.JPG"
                  alt="削除する"
                  width={240}
                  height={140}
                />
                <p className="text-gray-600 ">{post.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NewArticles;
