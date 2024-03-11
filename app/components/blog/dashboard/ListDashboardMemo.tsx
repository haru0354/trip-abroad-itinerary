import prisma from "../../lib/prisma";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import ButtonImage from "../../ui/ButtonImage";
import React from "react";

const ListDashboardMemo = async () => {
  const dashboardMemos = await prisma.dashboardMemo.findMany();

  const sortedDashboardMemos = dashboardMemos.sort((a, b) => a.id - b.id);

  if (sortedDashboardMemos.length === 0) {
    return (
      <>
        <h2 className="bg-gray-700 text-xl bold text-white rounded mb-12 p-5 font-bold">
          メモの使い方
        </h2>
        <p>ここではサイト制作時のメモが簡単に追加できます。</p>
        <ul className="my-6 px-4 border p-4">
          <li className="flex py-3 px-2 text-red-500  ">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-sky-700 mr-4 w-5 h-4 mt-1"
              style={{ width: "15px" }}
            />
            <p>今後作成予定のページ</p>
          </li>
          <li className="flex py-3 px-2 text-red-500  ">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-sky-700 mr-4 w-5 h-4 mt-1"
              style={{ width: "15px" }}
            />
            <p>上位表示を狙っているキーワード</p>
          </li>
          <li className="flex py-3 px-2 text-red-500  ">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-sky-700 mr-4 w-5 h-4 mt-1"
              style={{ width: "15px" }}
            />
            <p>上位表示させる為に編集をする予定のページ</p>
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
        <div className="bg-gray-100 shadow-md rounded px-8 py-8 mb-10 border border-gray-200">
          <div className="flex justify-between border-b border-gray-500 mb-2">
            <div>
              <p className="text-red-500">メモの見出しエリア</p>
              <p>今後作成していく記事のメインキーワード</p>
            </div>
          </div>
          <div>
            <p className="text-red-500">メモする内容エリア</p>
            <p>
              「ブログ 作り方 無料」・「ブログ 作り方」・「スマホ・ブログ
              始め方」・「初心者 スマホ ブログ 作り方 」・「趣味・ブログ
              始め方」・「無料 ブログ 始め方 」・「ブログ 初心者 おすすめ無料」
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="bg-gray-700 text-xl bold text-white rounded mb-12 p-5 font-bold">
        メモの一覧
      </h2>
      {sortedDashboardMemos.map((memo) => {
        return (
          <React.Fragment key={memo.id}>
            <Link href={`/dashboard/${memo.id}`}>
              <ButtonImage
                className="rounded"
                size="small"
                icon="pen"
                iconClassName="mr-2"
              >
                編集
              </ButtonImage>
            </Link>
            <div className="bg-gray-200 shadow-md rounded px-8 py-8 mb-10 ">
              <div className="flex justify-between border-b-2 border-gray-300 mb-2">
                <div>{memo.name}</div>
              </div>
              <div>{memo.content}</div>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default ListDashboardMemo;
