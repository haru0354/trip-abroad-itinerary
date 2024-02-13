import Section1ColumnLeft from "../components/homePage/Section1ColumnLeft";
import Section1ColumnRight from "../components/homePage/Section1ColumnRight";
import Section3Column from "../components/homePage/Section3Column";
import SectionText from "../components/homePage/SectionText";
import Button from "../components/ui/Button";

export default async function Home() {
  return (
    <main>
      <div className="main-contents-area">
        <div className="">
          <h2 className="text-2xl bg-sky-400 text-center my-8 py-2">
            旅程表作成のしおりアプリ「旅のメモリーブック」
          </h2>
          <Section1ColumnRight
            src="/WS0dsa00000.JPG"
            alt="aa"
            name="国内旅行・海外旅行のしおりアプリ"
            content="旅程表では詳細な情報を記載をすることができます。事前に行先を決めることによって、英語ができない人でも旅行ができます。"
          />
          <Section1ColumnRight
            src="/WS0dsa00000.JPG"
            alt="aa"
            name="英語　"
            content="旅程表では詳細な情報を記載をすることができます。事前に行先を決めることによって、英語ができない人でも旅行ができます。"
          />
          <SectionText
            title="旅のメモリーブックとは"
            name1="PC・スマホから利用できる無料のアプリ"
            name2="簡単に旅のしおり（旅程表の作成・メモの作成）が可能"
            name3="国内旅行だけでなく英語が話せない人の海外旅行のしおりとしての機能"
            content="表示切替ボタンにより、必要なタイミングで必要なメモを閲覧が可能。英語が話せない人でも「目的地への具体的な行き方（乗り換え方法・バス番号・時間）」をはじめ、「食事予定のメニューの英語名や呼び方」など、事前にメモをすることで安心して海外旅行が可能。"
          />
          <Section3Column
            title="旅のメモリーブック3つの特徴"
            name1="旅程表の作成"
            name2="メモの作成"
            name3="持ち物リストの作成"
            content1="旅程表では詳細な情報を記載をすることができます。事前に行先を決めることによって、英語ができない人でも旅行ができます。"
            content2="旅程表では詳細な情報を記載をすることができます。事前に行先を決めることによって、英語ができない人でも旅行ができます。"
            content3="旅程表では詳細な情報を記載をすることができます。事前に行先を決めることによって、英語ができない人でも旅行ができます。"
          />
          <div>
            <Button className="btn blue">登録</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
