import Link from "next/link";
import { getCategories } from "@/app/(blog)/lib/service/blogServiceMany";

const SideCategoryMenu = async () => {
  const categories = await getCategories("posts");

  if (!categories) {
    return null;
  }

  return (
    <div className="w-full p-2">
      <h3 className="px-2 py-4 font-bold text-lg rounded bg-blog-heading text-white">
        カテゴリ
      </h3>
      {categories.map((category) => {
        if (
          !category ||
          ((!category.title || category.title === "") &&
            category.posts.every((post) => !post.draft))
        ) {
          return null;
        }
        return (
          <ul key={category.id}>
            <li className="py-4 hover:bg-gray-200">
              <Link href={`/${category.slug}`}>
                <p className="text-gray-600 mb-1 px-3">{category.name}</p>
              </Link>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default SideCategoryMenu;
