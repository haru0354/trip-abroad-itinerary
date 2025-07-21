import { notFound } from "next/navigation";

import { getCategory } from "@/app/(blog)/lib/service/blogServiceUnique";
import { getCategories } from "@/app/(blog)/lib/service/blogServiceMany";
import LeftColumn from "../../components/content-area/LeftColumn";
import SideMenu from "../../components/side-menu/SideMenu";

export const dynamicParams = true;
export const revalidate = 60 * 60 * 24 * 15;

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
