import Breadcrumbs from "./parts/Breadcrumbs";
import ArticleTop from "./parts/ArticleTop";
import ArticleContentArea from "./parts/ArticleContentArea";
import RelatedArticles from "./related-articles/RelatedArticles";
import NotFound from "../../../not-found";

import type { PostWithCategoryAndImage } from "../../types/PostTypes";
import type { CategoryWithPostsAndImage } from "../../types/categoryTypes";

type LeftColumnProps = {
  categoryPage: boolean;
  category?: CategoryWithPostsAndImage;
  post?: PostWithCategoryAndImage;
  formattedCreatedDate?: string;
  filteredCategoryInArticles?: Article[];
};

type Article = {
  id: number;
  createdDate: string | Date;
  updatedDate: string | Date;
  title: string;
  content: string;
  categoryId: number;
  description: string;
  slug: string;
  postImageId: number | null;
  draft: boolean;
};

const LeftColumn: React.FC<LeftColumnProps> = ({
  categoryPage,
  category,
  post,
  formattedCreatedDate,
  filteredCategoryInArticles,
}) => {
  return (
    <div className="blog w-full md:max-w-[818px] bg-white rounded py-4 px-4 md:px-12 mr-8">
      {categoryPage && category ? (
        <>
          <Breadcrumbs
            categoryName={category.name}
            categorySlug={category.slug}
            isCategoryDirectory={true}
          />
          {category.title ? (
            <h1>{category.title}</h1>
          ) : (
            <h1>「{category.name}」のカテゴリ</h1>
          )}
          {category.postImage?.url && (
            <ArticleTop
              src={category.postImage.url}
              alt={category.postImage.altText}
            />
          )}
          {category.content && (
            <ArticleContentArea content={category.content} />
          )}
          {category.posts && (
            <RelatedArticles
              articles={category.posts}
              categorySlug={category.slug}
              categoryName={category.name}
            />
          )}
        </>
      ) : post ? (
        <>
          <Breadcrumbs
            categoryName={post.category.name}
            categorySlug={post.category.slug}
          />
          <h1>{post.title}</h1>
          {post.postImage?.url && (
            <ArticleTop src={post.postImage.url} alt={post.postImage.altText} />
          )}
          {formattedCreatedDate && (
            <p className="text-gray-500 mb-5">
              記事の投稿日：{formattedCreatedDate}
            </p>
          )}
          <ArticleContentArea content={post.content} />
          {filteredCategoryInArticles && (
            <RelatedArticles
              articles={filteredCategoryInArticles}
              categorySlug={post.category.slug}
            />
          )}
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default LeftColumn;
