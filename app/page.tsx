import Link from "next/link";
import Header from "./(blog)/components/layout/blog/Header";
import FlexImageAndContents from "./components/layout/FlexImageAndContents";
import CategoryList from "./(blog)/components/section/CategoryList";
import NewArticleList from "./(blog)/components/section/NewArticleList";
import Footer from "./(blog)/components/layout/blog/Footer";
import Button from "./components/ui/Button";
import HeaderImage from "./(blog)/components/layout/blog/HeaderImage";
import Modal from "./components/ui/Modal";

export default function Home() {
  return (
    <>
      <Header isTopPage={true} />
      {process.env.NEXT_PUBLIC_HEADER_IMAGE === "true" && <HeaderImage />}
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
            </div>
          </section>
          <NewArticleList />
          <CategoryList />
        </div>
      </main>
      <Footer />
    </>
  );
}
