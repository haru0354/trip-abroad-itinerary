import Link from "next/link";
import Header from "./components/Header";
import Section1ColumnRight from "./components/1ColumnPage/Section1ColumnRight";
import Button from "./components/ui/Button";
import CategoryTop from "./components/1ColumnPage/CategoryTop";
import NewArticleTop from "./components/1ColumnPage/NewArticleTop";
import Footer from "./components/Footer";
import AnimatedItem from "./components/lib/AnimatedItem";

export default function Home() {
  return (
    <>
      <Header isTopPage={true} />
      <main>
        <div className="w-full">
          <div className="">
            <div className="max-w-[1150px] w-full py-10  md:px-8 mx-auto px-4">
              <AnimatedItem
                elementType="h2"
                animation="fadeInVariants"
                className="text-center text-2xl py-8 bg-white text-gray-700 font-bold"
              >
                国内・海外の旅行のしおり作成アプリをリリース
              </AnimatedItem>
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
          </div>

              <NewArticleTop />


              <CategoryTop />

          <div className="flex justify-center"></div>
          <h2 className="text-center">カテゴリ</h2>
          ここにカテゴリを3列で表示
          <Link href="./dashboard/">ブログ管理</Link>
          <Link href="./admin/">ブログログイン</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
