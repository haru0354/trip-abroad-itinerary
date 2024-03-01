import Link from "next/link";
import Header from "./components/Header";
import Section1ColumnRight from "./components/homePage/Section1ColumnRight";
import Button from "./components/ui/Button";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="main-contents-area">
          <div className="w-full bg-white">
            <h2 className="text-2xl bg-sky-400 text-center my-8 py-2">
              英語が話せない人でも海外旅行がしたい
            </h2>
            <Section1ColumnRight
              src="/app-gazou.JPG"
              alt="aa"
              name="「旅のメモリーブック」"
              content="PC・スマホ・タブレットで利用できる無料の国内旅行・海外旅行しおりアプリ。"
              content2="あああ"
              content3="あああ"
            />
            <div className="flex justify-center">
              <Link href="./travel_brochure/">
                <Button className="px-16 mx-6 mb-10 py-3 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900">
                  旅のメモリーブックへ
                </Button>
              </Link>
            </div>
            <h3>新着記事</h3>
            ここに新着記事を3列2行で表示
            <h3>カテゴリ</h3>
            ここにカテゴリを3列で表示

            <ul>
              <li>
                <Link href="./dashboard/">ブログ管理</Link>
              </li>
              <li>
                <Link href="./admin/">ブログログイン</Link>
              </li>
              <li>
                <Link href="./travel_brochure/">アプリtop</Link>
              </li>
              <li>
                <Link href="./travel_brochure/itinerary">旅程表</Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
