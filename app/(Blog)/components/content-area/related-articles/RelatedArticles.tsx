import Link from "next/link";
import Card from "./Card";

type RelatedArticlesProps = {
  articles: Article[];
  categorySlug: string;
  categoryName?: string;
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
  postImageId?: number | null;
  draft: boolean;
};

const RelatedArticles: React.FC<RelatedArticlesProps> = async ({
  articles,
  categorySlug,
  categoryName,
}) => {
  if (articles.length === 0) {
    return null;
  }

  return (
    <>
      {categoryName ? <h2>{categoryName}の記事一覧</h2> : <h2>関連記事</h2>}
      {articles.map((article) => {
        return (
          <Link href={`/${categorySlug}/${article.slug}`} key={article.id}>
            <Card post={article} />
          </Link>
        );
      })}
    </>
  );
};

export default RelatedArticles;
