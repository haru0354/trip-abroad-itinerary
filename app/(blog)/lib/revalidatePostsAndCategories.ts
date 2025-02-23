import { revalidatePath } from "next/cache";

import { getPosts } from "@/app/(blog)/lib/service/blogServiceMany";

export async function revalidatePostsAndCategories() {
  try {
    const posts = await getPosts("category");
    const filteredPosts = posts.filter((post) => post.draft);

    const uniqueCategorySlug = [
      ...new Set(filteredPosts.map((post) => post.category.slug)),
    ];

    uniqueCategorySlug.map((category) => {
      revalidatePath(`/${category}`);
    });

    filteredPosts.map((post) => {
      revalidatePath(`/${post.category.slug}/${post.slug}`);
    });
  } catch (error) {
    console.error("投稿とカテゴリのパスの再検証に失敗しました", error);
  }
}
