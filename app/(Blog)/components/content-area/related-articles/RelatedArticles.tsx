import Link from "next/link";

import Card from "./Card";

import type { Post } from "@prisma/client";

type RelatedArticlesProps = {
  articles: Post[];
  categorySlug: string;
  categoryName?: string;
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
    <section>
      {categoryName ? <h2>{categoryName}の記事一覧</h2> : <h2>関連記事</h2>}
      {articles.map((article) => {
        return (
          <Link href={`/${categorySlug}/${article.slug}`} key={article.id}>
            <Card post={article} />
          </Link>
        );
      })}
    </section>
  );
};

export default RelatedArticles;
