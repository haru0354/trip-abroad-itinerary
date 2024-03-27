import NotFound from "@/app/NotFound";
import ArticleContentArea from "@/app/components/blog/blogContent/ArticleContentArea";
import ArticleTop from "@/app/components/blog/blogContent/ArticleTop";
import Breadcrumbs from "@/app/components/blog/Breadcrumbs";

import { getPost } from "@/app/components/lib/BlogServiceUnique";

const Page = async ({ params }: { params: { post_slug: string } }) => {
  const post = await getPost(params.post_slug);

  if (!post || post.draft === false) {
    return (
      <>
        <NotFound />
        <p>記事が存在しないか削除された可能性があります。</p>
      </>
    );
  }

  const formattedCreatedDate = new Date(post.createdDate).toLocaleDateString();

  return (
    <>
      <Breadcrumbs
        categoryName={post?.category.name}
        categorySlug={post?.category.slug}
      />
      <h1>{post.title}</h1>
      <ArticleTop src={post.postImage?.url} alt={post.postImage?.altText} />
      <p className="text-gray-500 mb-5">記事の投稿日：{formattedCreatedDate}</p>
      <ArticleContentArea content={post.content} />
    </>
  );
};

export default Page;
