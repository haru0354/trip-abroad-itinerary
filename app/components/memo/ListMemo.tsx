import Link from "next/link";
import ButtonImage from "../ui/ButtonImage";

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

  return (
    <>
      <h2 className="bg-blue-400 text-xl bold text-white rounded mt-10 mb-10 p-5">
        メモの一覧
      </h2>
      {sortedMemos?.map((memo) => {
        return (
          <>
            <Link href={`/travel_brochure/${itineraryHomeId}/memo/${memo.id}`}>
              <ButtonImage
                className="rounded"
                size="small"
                icon="pen"
                iconClassName="mr-2"
              >
                編集
              </ButtonImage>
            </Link>
            <div className="bg-sky-50 shadow-md rounded px-8 py-8 mb-10 ">
              <div className="border-b border-gray-400 pb-2">
                <h3 className="text-center font-bold text-gray-700">
                  {memo.name}
                </h3>
              </div>
              <div className="mt-4 text-gray-700">{memo.content}</div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default ListMemo;
