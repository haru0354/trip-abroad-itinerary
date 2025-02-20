import Link from "next/link";

import Manual from "../Manual";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";
import SplitTextLines from "@/app/(memorybook)/memorybook/lib/SplitTextLines";
import ButtonImage from "@/app/components/ui/button/ButtonImage";

import type { Memo } from "@prisma/client";

type ListMemoProps = {
  tripId: number | undefined;
  memos: Memo[] | undefined;
};

const ListMemo: React.FC<ListMemoProps> = async ({ memos, tripId }) => {
  const sortedMemos = memos?.sort((a, b) => a.id - b.id);

  if (sortedMemos && sortedMemos.length === 0) {
    return (
      <>
        <Manual
          title="メモの使い方"
          content="このページでは様々なメモを登録することができます。"
          explanation="などなど、使い方はあなた次第です。まずは試しに登録をしてみてください。"
          lists={[
            "旅行前の準備(用意する物・やらなければいけない事)",
            "旅行中のメモ(海外旅行保険の連絡先・購入予定のお土産)",
          ]}
        />
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
            <Link href={`/memorybook/${tripId}/memo/${memo.id}`}>
              <ButtonImage
                className="rounded"
                size="small"
                icon="pen"
                iconClassName="mr-2"
              >
                編集
              </ButtonImage>
            </Link>
            <div className="bg-gray-50 border border-itinerary-borderGray shadow-md rounded px-8 py-5 mb-10 ">
              <div className="border-b border-itinerary-borderGray">
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
