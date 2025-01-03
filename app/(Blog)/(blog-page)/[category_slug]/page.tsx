import { getCategory } from "@/app/(blog)/lib/service/blogServiceUnique";
import { getCategories } from "@/app/(blog)/lib/service/blogServiceMany";
import LeftColumn from "../../components/content-area/LeftColumn";
import SideMenu from "../../components/side-menu/SideMenu";
import NotFound from "@/app/not-found";

export async function generateStaticParams() {
  const categories = await getCategories("categoryAndPostImage");

  return categories.map((category) => ({
    params: {
      category_slug: category.slug,
    },
    revalidate: 60 * 60 * 24 * 15,
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
    return (
      <div>
        <NotFound />
        <p>カテゴリが存在しないか削除された可能性があります。</p>
      </div>
    );
  }

  return (
    <>
      <LeftColumn categoryPage={true} category={category} />
      <SideMenu />
    </>
  );
};

export default page;
