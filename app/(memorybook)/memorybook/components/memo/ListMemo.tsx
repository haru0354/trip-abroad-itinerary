import Manual from "../Manual";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";
import SplitTextLines from "@/app/(memorybook)/memorybook/lib/SplitTextLines";
import ButtonImageLink from "@/app/components/ui/button/ButtonImageLink";

import type { Memo } from "@prisma/client";

type ListMemoProps = {
  tripId: string | undefined;
  memos: Memo[] | undefined;
};

const ListMemo: React.FC<ListMemoProps> = async ({ memos, tripId }) => {
  if ( memos?.length === 0) {
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
          <h3 className="mb-4 pb-2 text-center font-semibold border-b border-itinerary-borderGray">
            海外旅行保険の連絡先
          </h3>
          海外旅行保険センター：000-0000-0000。〇〇医療病院：000-0000-0000。治療費を負担なしで診療できる。日本語の通訳もあり。
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="bg-itinerary-heading text-center">メモの一覧</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {memos?.map((memo) => {
          return (
            <AnimatedItem
              elementType="div"
              animation="fadeInLeftVariants"
              key={memo.id}
              className="pt-[44px] mt-[22px] bg-top bg-no-repeat"
              imageUrl="/memo-image.png"
            >
              <div className="text-right mb-[-2px]">
                <ButtonImageLink
                  href={`/memorybook/${tripId}/memo/${memo.id}`}
                  className="rounded"
                  size="small"
                  icon="pen"
                  iconClassName="mr-2"
                >
                  編集
                </ButtonImageLink>
              </div>
              <div className="h-full p-4 border rounded shadow-md border-itinerary-borderGray bg-gray-50">
                <h3 className="mb-4 pb-2 text-center font-semibold border-b border-itinerary-borderGray">
                  {memo.name}
                </h3>
                {memo.content && <SplitTextLines text={memo.content} />}
              </div>
            </AnimatedItem>
          );
        })}
      </div>
    </>
  );
};

export default ListMemo;
