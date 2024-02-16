import Link from "next/link";
import prisma from "../lib/prisma";

const SideCategoryMenu = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      category: 'asc'
    }
  });

  return (
    <div className="w-full p-2">
      <ul>
        <li className="py-4 hover:bg-gray-200">
          <Link href="/">
            <p className="text-gray-600">TOPページ</p>
          </Link>
        </li>
        <li className="py-4 hover:bg-gray-200">
          <Link href="/home">
            <p className="text-gray-600">管理画面</p>
          </Link>
        </li>
      </ul>

      <h3 className="bg-green-600 text-white font-bold px-2 py-4">
        カテゴリー
      </h3>
      {posts.map((post, index) => {
        const isFirstItem =
        index === 0 || post.category !== posts[index - 1].category;
        return (
          <ul key={post.id}>
            {isFirstItem && (
              <li className="py-4 hover:bg-gray-200">
                <Link href={`/${post.categorySlag}`}>
                  <p className="text-gray-600">{post.category}</p>
                </Link>
              </li>
            )}
          </ul>
        );
      })}
    </div>
  );
};

export default SideCategoryMenu;
