import Link from "next/link";
import Header from "./components/Header";
import Section1ColumnRight from "./components/homePage/Section1ColumnRight";
import Button from "./components/ui/Button";
import CategoryTop from "./components/blog/CategoryTop";
import NewArticleTop from "./components/blog/NewArticleTop";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header isTopPage={true} />
      <main>
        <div className="main-contents-area">
          <div className="w-full bg-white">
            <h2 className="bg-blue-400 text-xl font-semibold text-white text-center rounded my-10 p-5">
              国内・海外の旅行の旅程表を作成するしおりアプリをリリース
            </h2>
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
            <NewArticleTop />
            <CategoryTop />
            <div className="flex justify-center"></div>
            <h3>新着記事</h3>
            ここに新着記事を3列2行で表示
            <h3>カテゴリ</h3>
            ここにカテゴリを3列で表示
            <Link href="./dashboard/">ブログ管理</Link>
            <Link href="./admin/">ブログログイン</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
