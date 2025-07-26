import {
  getCategories,
  getPosts,
} from "@/app/(blog)/lib/service/blogServiceMany";
import {
  blogDescription,
  blogTitle,
  headerImageConfig,
} from "@/app/(blog)/config/blogConfig";
import Header from "@/app/(blog)/components/layout/blog/Header";
import HeaderImage from "@/app/(blog)/components/layout/blog/HeaderImage";
import Section from "@/app/components/layout/Section";
import FlexImageAndContents from "@/app/components/layout/FlexImageAndContents";
import CategoryList from "@/app/(blog)/components/section/CategoryList";
import NewArticleList from "@/app/(blog)/components/section/NewArticleList";
import Footer from "@/app/(blog)/components/layout/blog/Footer";
import { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = 60 * 60 * 24 * 15;

export const metadata: Metadata = {
  title: `${blogTitle}`,
  description: `${blogDescription}`,
};

export default async function Home() {
  const categoriesWithPostAndImage = await getCategories("postsAndPostImage");
  const postsWithCategoryAndPostImage = await getPosts(
    "categoryAndPostImage",
    6
  );

  return (
    <>
      <Header isTopPage={true} />
      {headerImageConfig && <HeaderImage />}
      <main>
        <div className="w-full">
          <Section bgColor="bg-white" name="リリース情報">
            <FlexImageAndContents
              src="/travel_memory_thumbnail.jpg"
              alt="旅のメモリーブックのサムネイル"
              name="「旅のメモリーブック」"
              contents={[
                "PC・スマホ・タブレットで利用できる無料の国内旅行・海外旅行しおりアプリ。",
                "簡単に旅程表を作成でき、旅行中に撮影した写真を掲載し、旅の思い出のしおりして残すことができます。",
                "特に「英語が話せない人の海外旅行」向けに事前にメモできる項目が多く設定されています。",
              ]}
              buttonText="旅のメモリーブックへ"
              buttonHref="/memorybook"
              isPriority={true}
            />
          </Section>
          <NewArticleList posts={postsWithCategoryAndPostImage} />
          <CategoryList categories={categoriesWithPostAndImage} />
        </div>
      </main>
      <Footer />
    </>
  );
}
