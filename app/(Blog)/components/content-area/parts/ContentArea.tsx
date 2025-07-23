import Breadcrumbs from "./Breadcrumbs";
import ArticleTop from "./ArticleTop";
import ArticleContentArea from "./ArticleContentArea";

import type { PostWithCategoryAndImage } from "../../../types/postTypes";
import type { CategoryWithPostsAndImage } from "../../../types/categoryTypes";

type ContentsAreaProps = {
  categoryPage: boolean;
  category?: CategoryWithPostsAndImage;
  post?: PostWithCategoryAndImage;
  formattedCreatedDate?: string;
};

const ContentsArea: React.FC<ContentsAreaProps> = ({
  categoryPage,
  category,
  post,
  formattedCreatedDate,
}) => {
  if (categoryPage && category) {
    return (
      <section>
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
        {category.content && <ArticleContentArea content={category.content} />}
      </section>
    );
  }

  if (post) {
    return (
      <section>
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
      </section>
    );
  }

  return null;
};

export default ContentsArea;
