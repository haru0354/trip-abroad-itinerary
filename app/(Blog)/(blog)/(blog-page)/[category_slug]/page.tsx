import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getCategory } from "@/app/(blog)/lib/service/blogServiceUnique";
import { getCategories } from "@/app/(blog)/lib/service/blogServiceMany";
import LeftColumn from "@/app/(blog)/components/content-area/LeftColumn";
import SideMenu from "@/app/(blog)/components/side-menu/SideMenu";
import { blogBrandTitle, blogDescription } from "@/app/(blog)/config/blogConfig";

export const dynamicParams = true;
export const revalidate = 60 * 60 * 24 * 15;

export const generateMetadata = async ({
  params,
}: {
  params: { category_slug: string };
}): Promise<Metadata> => {
  const category = await getCategory("slug", params.category_slug, "posts");

  if (category?.title) {
    return {
      title: category?.title,
      description: category?.description,
    };
  } else if (
    !category ||
    (category.posts.length > 0 && category.posts.every((post) => !post.draft))
  ) {
    return {
      title: `カテゴリが存在しません | ${blogBrandTitle}`,
      description: `${blogDescription}`,
      robots: {
        index: false,
      },
    };
  } else {
    return {
      title: category?.name,
      description: category?.description,
    };
  }
};

export async function generateStaticParams() {
  const categories = await getCategories("categoryAndPostImage");

  return categories.map((category) => ({
    category_slug: category.slug,
  }));
}

const page = async ({ params }: { params: { category_slug: string } }) => {
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

  return (
    <>
      <LeftColumn categoryPage={true} category={category} />
      <SideMenu />
    </>
  );
};

export default page;
