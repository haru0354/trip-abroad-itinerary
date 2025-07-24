import ContentsArea from "./parts/ContentArea";
import RelatedArticles from "./related-articles/RelatedArticles";

import type { Post } from "@prisma/client";
import type { PostWithCategoryAndImage } from "../../types/postTypes";
import type { CategoryWithPostsAndImage } from "../../types/categoryTypes";

type LeftColumnProps = {
  categoryPage: boolean;
  category?: CategoryWithPostsAndImage;
  post?: PostWithCategoryAndImage;
  formattedCreatedDate?: string;
  filteredCategoryInArticles?: Post[];
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
      <ContentsArea
        categoryPage={categoryPage}
        category={category}
        post={post}
        formattedCreatedDate={formattedCreatedDate}
      />

      {categoryPage && category?.posts && (
        <RelatedArticles
          articles={category.posts}
          categorySlug={category.slug}
          categoryName={category.name}
        />
      )}

      {!categoryPage && filteredCategoryInArticles && post && (
        <RelatedArticles
          articles={filteredCategoryInArticles}
          categorySlug={post.category.slug}
        />
      )}
    </div>
  );
};

export default LeftColumn;
