import { getPosts } from "./BlogServiceMany";
import { revalidatePath } from "next/cache";

export async function revalidatePostsAndCategories() {
  const posts = await getPosts("category");
  const filteredPosts = posts.filter((post) => post.draft);

  const uniqueCategorySlug = [
    ...new Set(filteredPosts.map((post) => post.category.slug)),
  ];

  const post_slug = filteredPosts.map((post) => post.slug);

  uniqueCategorySlug.forEach((category) => {
    revalidatePath(`/${category}`);
  });

  filteredPosts.forEach((post, index) => {
    revalidatePath(`/${post.category.slug}/${post_slug[index]}`);
  });
}