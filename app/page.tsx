import Link from "next/link";
import Header from "./components/Header";
import Section from "./components/1ColumnPage/Section";
import Section1ColumnRight from "./components/1ColumnPage/Section1ColumnRight";
import CategoryTop from "./components/1ColumnPage/CategoryTop";
import NewArticleTop from "./components/1ColumnPage/NewArticleTop";
import Footer from "./components/Footer";
import Button from "./components/ui/Button";
import HeaderImage from "./components/1ColumnPage/HeaderImage";

export default function Home() {
  return (
    <>
      <Header isTopPage={true} />
      <HeaderImage />
      <main>
        <div className="w-full">
        <section className="bg-white">
            <div className="max-w-[1150px] w-full py-2 md:py-6 px-4 mx-auto">
              <div className="flex items-center mx-0 py-8">
                <span className="flex-grow h-1 w-5 md:w-0 mr-1 md:mr-4 bg-gradient-to-l from-gray-600 to-transparent"></span>
                <h2 className="text-2xl md:text-3xl py-0 my-5 text-gray-700 text-center font-bold bg-transparent">
                  しおりアプリ「旅のメモリーブック」の機能の一部
                </h2>
                <span className="flex-grow h-1 w-5 md:w-0 mr-1 md:mr-4 bg-gradient-to-r from-gray-600 to-transparent"></span>
              </div>
            <Section1ColumnRight
              src="/travel_memory_thumbnail.jpg"
              alt="旅のメモリーブックのサムネイル"
              name="「旅のメモリーブック」"
              content="PC・スマホ・タブレットで利用できる無料の国内旅行・海外旅行しおりアプリ。"
              content2="簡単に旅程表を作成でき、旅行中に撮影した写真を掲載し、旅の思い出のしおりして残すことができます。"
              content3="特に「英語が話せない人の海外旅行」向けに事前にメモできる項目が多く設定されています。"
            />
            <Link href="./memorybook/">
              <Button color="blue" size="normal">
                旅のメモリーブックへ
              </Button>
            </Link>
            </div>
          </section>
          <Section bgColor="bg-sky-50" name="新着記事">
            <NewArticleTop />
          </Section>
          <Section bgColor="bg-white" name="カテゴリ">
            <CategoryTop />
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
