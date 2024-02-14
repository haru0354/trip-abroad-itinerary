import Section1ColumnRight from "../components/homePage/Section1ColumnRight";
import Section3Column from "../components/homePage/Section3Column";
import SectionText from "../components/homePage/SectionText";
import QA from "../components/homePage/QA";
import Hero from "../components/homePage/Hero";
import SignupButton from "../components/ui/SignupButton";
import getCurrentUser from "../action/getCurrentUser";

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <>
      <Hero />
      <main>
        <div className="main-contents-area">
          <div>
            <h2 className="text-2xl bg-sky-400 text-center my-8 py-2">
              旅程表作成のしおりアプリ「旅のメモリーブック」
            </h2>
            <Section1ColumnRight
              src="/app-gazou.JPG"
              alt="aa"
              name="英語が話せない人でも海外旅行へ"
              content="英語が話せない人でも安心して海外旅行へをコンセプトに作成されたアプリです。"
              content2="事前に「目的地への行き方」「タクシー・バス・電車の乗り方」「注意事項」など様々な内容を事前にメモ!"
              content3="現地で必要なタイミングでメモを閲覧できるので、言語の壁があっても安心して旅行が可能です。"
            />
            <Section1ColumnRight
              src="/app-gazou.JPG"
              alt="aa"
              name="PC・スマホから作成できる無料の「旅行のしおりアプリ」"
              content="PC・スマホから完全無料で利用が可能な国内旅行・海外旅行のしおりアプリ。"
              content2="旅程表をお手軽に作成することが可能です。"
              content3="利用は完全無料となっているので、10秒ほどのアカウント登録をすればすぐにもで「国内旅行・海外旅行のしおり」が作成できるアプリとなっています"
            />
            <SectionText
              title="旅のメモリーブックとは"
              name1="PC・スマホから利用できる無料のアプリ"
              name2="簡単に旅のしおり（旅程表・メモ）の作成が可能"
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
            <h2 className="text-center text-gray-700 mb-6 text-2xl font-semibold">
              旅行後は思い出の旅程表となる
            </h2>
            <Section1ColumnRight
              src="/app-gazou.JPG"
              alt="aa"
              name="帰国後にしおりを完成形へ"
              content="旅行中に撮影した写真を利用して、作成したしおりを画像で彩ることができます。旅程中は予定の管理として旅程表を使用していましたが、帰国後はあなたの思い出の旅程表へとなります。帰国後はしおりを完成させましょう。
            "
            />
            <h2 className="text-center text-gray-700 my-10 text-2xl font-semibold">
              よくある質問
            </h2>
            <QA
              title="本当に無料で利用できますか？"
              content="旅のメモリーブックは完全に無料で利用できるアプリとなっています。アカウントを10秒ほどで作成後はすぐにアプリの全機能を利用することが可能で、すぐにでも国内・海外旅行のしおりとして旅程表の作成などできます。"
            />
            <QA title="a" content="a" />
            <QA title="a" content="a" />
            <div className="text-center py-4">
              <SignupButton />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
