import Section1Column from "../components/homePage/Section1Column";
import Section3Column from "../components/homePage/Section3Column";
import Button from "../components/ui/Button";

export default async function Home() {
  return (
    <main>
      <div className="main-contents-area">
        <div className="">
          <Section1Column
            src="/WS0dsa00000.JPG"
            alt="aa"
            name="name"
            content="旅程表では詳細な情報を記載をすることができます。事前に行先を決めることによって、英語ができない人でも旅行ができます。"
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
