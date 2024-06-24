import Link from "next/link";
import { getCategories } from "../components/lib/BlogServiceMany";

const page = async () => {
  const categories = await getCategories("posts");

  return (
    <>
      <h2>サイトマップ</h2>
      {categories.map((category) => {
        return (
          <div className="px-8" key={category.id}>
            <ul className="text-[#2a7bdf]">
              <li className="my-4 font-semibold">
                <Link href={`/${category.slug}`}>{category.name}</Link>
              </li>
              {category.posts.map((post) => (
                <li key={post.id} className="my-4 ml-4 list-disc list-inside">
                  <Link href={`/${category.slug}/${post.slug}`}>
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default page;
