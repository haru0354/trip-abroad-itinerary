import { getPost } from "@/app/(blog)/lib/service/blogServiceUnique";
import { getPosts } from "@/app/(blog)/lib/service/blogServiceMany";
import NotFound from "@/app/not-found";
import ArticleContentArea from "@/app/(blog)/components/content-area/parts/ArticleContentArea";
import ArticleTop from "@/app/(blog)/components/content-area/parts/ArticleTop";
import Breadcrumbs from "@/app/(blog)/components/content-area/parts/Breadcrumbs";
import SideMenu from "@/app/(blog)/components/side-menu/SideMenu";

export async function generateStaticParams() {
  const posts = await getPosts("categoryAndPostImage");

  return posts.map((post) => ({
    params: {
      post_slug: post.slug,
    },
    revalidate: 60 * 60 * 24 * 15,
  }));
}

const Page = async ({ params }: { params: { post_slug: string } }) => {
  const post = await getPost("slug", params.post_slug, "categoryAndPostImage");

  if (!post || post.draft === false) {
    return (
      <div>
        <NotFound />
        <p>記事が存在しないか削除された可能性があります。</p>
      </div>
    );
  }

  const formattedCreatedDate = new Date(post.createdDate).toLocaleDateString();

  return (
    <>
      <div className="blog w-full md:w-3/4 bg-white rounded-sm py-8 px-4 md:px-12 mr-8 ">
        <Breadcrumbs
          categoryName={post?.category.name}
          categorySlug={post?.category.slug}
        />
        <h1>{post.title}</h1>
        <ArticleTop src={post.postImage?.url} alt={post.postImage?.altText} />
        <p className="text-gray-500 mb-5">
          記事の投稿日：{formattedCreatedDate}
        </p>
        <ArticleContentArea content={post.content} />
      </div>
      <div className="w-full md:w-1/4 py-4 bg-white rounded">
        <SideMenu />
      </div>
    </>
  );
};

export default Page;
