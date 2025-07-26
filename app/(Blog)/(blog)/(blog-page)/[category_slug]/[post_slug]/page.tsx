import { Metadata } from "next";
import { notFound } from "next/navigation";

import { blogBrandTitle, blogDescription } from "@/app/(blog)/config/blogConfig";
import {
  getCategory,
  getPost,
} from "@/app/(blog)/lib/service/blogServiceUnique";
import { getPosts } from "@/app/(blog)/lib/service/blogServiceMany";
import LeftColumn from "@/app/(blog)/components/content-area/LeftColumn";
import SideMenu from "@/app/(blog)/components/side-menu/SideMenu";

export const dynamicParams = true;
export const revalidate = 60 * 60 * 24 * 15;

export const generateMetadata = async ({
  params,
}: {
  params: { post_slug: string };
}): Promise<Metadata> => {
  const post = await getPost("slug", params.post_slug);

  if (!post?.draft) {
    return {
      title: "投稿が存在しません",
      robots: {
        index: false,
      },
    };
  } else {
    return {
      title: `${post?.title}`,
      description: post?.description,
    };
  }
};

export async function generateStaticParams() {
  const posts = await getPosts("categoryAndPostImage");

  return posts.map((post) => ({
    category_slug: post.category.slug,
    post_slug: post.slug,
  }));
}

const Page = async ({
  params,
}: {
  params: { post_slug: string; category_slug: string };
}) => {
  const post = await getPost("slug", params.post_slug, "categoryAndPostImage");

  if (!post || post.draft === false) {
    return notFound();
  }

  const formattedCreatedDate = new Date(post.createdDate).toLocaleDateString();

  const category = await getCategory(
    "slug",
    params.category_slug,
    "postsAndPostImage"
  );

  if (
    !category ||
    (!category.title && category.posts.every((post) => !post.draft))
  ) {
    return notFound();
  }

  const filteredCategoryInArticles = (category.posts || []).filter(
    (post) => post.slug !== params.post_slug
  );

  return (
    <>
      <LeftColumn
        categoryPage={false}
        post={post}
        formattedCreatedDate={formattedCreatedDate}
        filteredCategoryInArticles={filteredCategoryInArticles}
      />
      <SideMenu />
    </>
  );
};

export default Page;
