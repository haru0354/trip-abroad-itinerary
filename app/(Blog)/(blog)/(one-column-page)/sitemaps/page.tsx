import { Metadata } from "next";
import Link from "next/link";

import { getCategories } from "@/app/(blog)/lib/service/blogServiceMany";
import { blogTitle } from "@/app/(blog)/config/blogConfig";

export const revalidate = 60 * 60 * 24 * 15;

export const metadata: Metadata = {
  title: "サイトマップ",
};

const page = async () => {
  const categories = await getCategories("posts");

  return (
    <>
      <h2>サイトマップ</h2>
      <p>
        <Link href="/" className=" font-semibold text-[#2a7bdf]">
          国内旅行・海外旅行の旅程表作成しおりアプリ「旅のメモリーブック」
        </Link>
        (旅程表作成アプリ)
      </p>
      <div className="p-4 mb-6 border border-dashed border-blog-borderGray">
        <p>
          <Link href="/blog" className="font-semibold text-[#2a7bdf]">
            {blogTitle}
          </Link>
          (旅の役立ちblog)
        </p>
        {categories.map((category) => {
          const draftTruePosts = category.posts.filter(
            (post) => post.draft === true
          );

          if (draftTruePosts.length === 0) {
            return null;
          }
          return (
            <div className="px-2 sm:px-4 md:px-8" key={category.id}>
              <ul className="text-[#2a7bdf]">
                <li className="my-4 font-semibold">
                  <Link href={`/${category.slug}`}>{category.name}</Link>
                </li>
                {draftTruePosts.map((post) => (
                  <li
                    key={post.id}
                    className="my-4 ml-2 md:ml-4 list-disc list-inside"
                  >
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
