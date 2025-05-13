import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

import { getDashboardMemos } from "@/app/(blog)/lib/service/blogServiceMany";
import HeadingTwo from "../../ui/dashboard/HeadingTwo";
import ButtonImageLink from "@/app/components/ui/button/ButtonImageLink";

const ListDashboardMemo = async () => {
  const dashboardMemos = await getDashboardMemos();

  const sortedDashboardMemos = dashboardMemos.sort((a, b) => a.id - b.id);

  if (sortedDashboardMemos.length === 0) {
    return (
      <>
        <HeadingTwo>メモの使い方</HeadingTwo>
        <p>ここではサイト制作時のメモが簡単に追加できます。</p>
        <ul className="my-6 px-4 border p-4">
          <li className="flex py-3 px-2 text-red-500  ">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-sky-700 mr-4 w-5 h-4 mt-1"
              style={{ width: "15px" }}
            />
            今後作成予定のページ
          </li>
          <li className="flex py-3 px-2 text-red-500  ">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-sky-700 mr-4 w-5 h-4 mt-1"
              style={{ width: "15px" }}
            />
            上位表示を狙っているキーワード
          </li>
          <li className="flex py-3 px-2 text-red-500  ">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-sky-700 mr-4 w-5 h-4 mt-1"
              style={{ width: "15px" }}
            />
            上位表示させる為に編集をする予定のページ
          </li>
        </ul>
        <p>
          元々ブログ制作時にこんな機能があったら嬉しいと思ったので追加しました。
        </p>
        <p>
          様々なメモを登録できるのでご自由にあなたにあった使い方をしてください。
        </p>
        <p className="pb-6"></p>
        例）
        <div className="px-8 py-8 mb-10 border shadow-md rounded border-blog-borderGray bg-gray-100">
          <div className="flex justify-between mb-2 border-b border-blog-borderBlack">
            <div>
              <p className="text-red-500">メモの見出しエリア</p>
              今後作成していく記事のメインキーワード
            </div>
          </div>
          <div>
            <p className="text-red-500">メモする内容エリア</p>
            「ブログ 作り方 無料」・「ブログ 作り方」・「スマホ・ブログ
            始め方」・「初心者 スマホ ブログ 作り方 」・「趣味・ブログ
            始め方」・「無料 ブログ 始め方 」・「ブログ 初心者 おすすめ無料」
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <HeadingTwo>サイト制作のメモ一覧</HeadingTwo>
      {sortedDashboardMemos.map((memo) => {
        return (
          <div key={memo.id}>
            <div className="text-right">
              <ButtonImageLink
                href={`/dashboard/${memo.id}`}
                className="rounded"
                size="small"
                icon="pen"
                iconClassName="w-[13px] h-[13px] mr-2"
              >
                編集
              </ButtonImageLink>
            </div>
            <div className="px-8 py-8 mb-10 bg-gray-200 shadow-md rounded">
              <div className="flex justify-between mb-2 border-b-2 border-blog-borderGray">
                <div>{memo.name}</div>
              </div>
              <div>{memo.content}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ListDashboardMemo;
