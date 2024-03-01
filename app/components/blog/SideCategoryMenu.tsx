import Link from "next/link";
import prisma from "../lib/prisma";

const SideCategoryMenu = async () => {
  const categories = await prisma.category.findMany({
    include: {
      posts: true,
    },
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
          <Link href="/dashboard">
            <p className="text-gray-600">管理画面</p>
          </Link>
        </li>
      </ul>
      <h3 className="bg-blue-500 text-white font-bold text-lg px-2 py-4 rounded-sm">
        カテゴリー
      </h3>
      {categories.map((category) => {
        if (category.posts.length === 0) {
          return null;
        }
        return (
          <ul key={category.id}>
            <li className="py-4 hover:bg-gray-200">
              <Link href={`/${category.slug}`}>
                <p className="text-gray-600">{category.name}</p>
              </Link>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default SideCategoryMenu;
