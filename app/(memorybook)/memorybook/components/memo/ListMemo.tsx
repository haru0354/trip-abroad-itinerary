import React from "react";
import Link from "next/link";
import Image from "next/image";
import ButtonImage from "@/app/components/ui/ButtonImage";
import Manual from "../Manual";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";
import SplitTextLines from "@/app/(memorybook)/memorybook/lib/SplitTextLines";

type ListMemoProps = {
  itineraryHomeId: number | undefined;
  memos: Memo[] | undefined;
};

type Memo = {
  id: number;
  name: string;
  content: string;
};

const ListMemo: React.FC<ListMemoProps> = async ({
  memos,
  itineraryHomeId,
}) => {
  const sortedMemos = memos?.sort((a, b) => a.id - b.id);

  if (sortedMemos && sortedMemos.length === 0) {
    return (
      <>
        <Manual
          title="メモの使い方"
          content1="このページでは様々なメモを登録することができます。"
          content2="などなど、使い方はあなた次第です。まずは試しに登録をしてみてください。"
          li1="旅行前の準備(用意する物・やらなければいけない事)"
          li2="旅行中のメモ(海外旅行保険の連絡先・購入予定のお土産)"
        />
        <div className="flex flex-col justify-center items-center text-center my-4 p-4 border border-dashed border-itinerary-borderBlack overflow-x-hidden">
          画面最下部のメニュー「追加」よりメモの登録ができます。
          <Image
            src="/manual.JPG"
            alt="マニュアル"
            width={347}
            height={57}
            style={{
              width: "347px",
              height: "auto",
            }}
          />
        </div>
        <p className="pt-6 font-bold text-center">サンプル</p>
        <div className="bg-sky-50 shadow-md rounded px-8 py-8 mb-10 ">
          <div className="border-b border-itinerary-borderBlack pb-2">
            <h3 className="text-center font-semibold">海外旅行保険の連絡先</h3>
          </div>
          <div className="mt-4">
            海外旅行保険センター：000-0000-0000。〇〇医療病院：000-0000-0000。治療費を負担なしで診療できる。日本語の通訳もあり。
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="bg-itinerary-heading text-center">メモの一覧</h2>
      {sortedMemos?.map((memo) => {
        return (
          <AnimatedItem
            elementType="div"
            animation="fadeInLeftVariants"
            key={memo.id}
            className="min-h-[200px] bg-top bg-no-repeat pt-[44px] w-full "
            imageUrl="/memo-image.png"
          >
            <Link href={`/memorybook/${itineraryHomeId}/memo/${memo.id}`}>
              <ButtonImage
                className="rounded"
                size="small"
                icon="pen"
                iconClassName="mr-2"
              >
                編集
              </ButtonImage>
            </Link>
            <div className="bg-gray-50 border border-gray-200 shadow-md rounded px-8 py-5 mb-10 ">
              <div className="border-b border-gray-300">
                <h3 className="text-center font-semibold">{memo.name}</h3>
              </div>
              {memo.content && (
                <div className="mt-4">
                  <SplitTextLines text={memo.content} />
                </div>
              )}
            </div>
          </AnimatedItem>
        );
      })}
    </>
  );
};

export default ListMemo;
