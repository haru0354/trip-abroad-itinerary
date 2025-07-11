import Link from "next/link";

import { getCategories } from "../../lib/service/blogServiceMany";
import { blogTitle } from "../../config/blogConfig";

const page = async () => {
  const categories = await getCategories("posts");

  return (
    <>
      <h2>サイトマップ</h2>
      <p className="font-semibold text-[#2a7bdf]">
        <Link href="/memorybook">
          国内旅行・海外旅行の旅程表作成しおりアプリ「旅のメモリーブック」
        </Link>
      </p>
      <div className="p-4 mb-6 border border-dashed border-blog-borderGray">
        <p className="font-semibold text-[#2a7bdf]">
          <Link href="/">{blogTitle}</Link>
        </p>
        {categories.map((category) => {
          const draftTruePosts = category.posts.filter(
            (post) => post.draft === true
          );
          return (
            <div className="px-8" key={category.id}>
              <ul className="text-[#2a7bdf]">
                <li className="my-4 font-semibold">
                  <Link href={`/${category.slug}`}>{category.name}</Link>
                </li>
                {draftTruePosts.map((post) => (
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
      </div>
    </>
  );
};

export default page;
