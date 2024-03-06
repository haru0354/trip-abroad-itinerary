import Button from "../ui/Button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

type ListMemoProps = {
  itineraryHomeId: number | undefined;
  memos: Memo[] | undefined;
};

type Memo = {
  id: number;
  name: string;
  content: string;
}

const ListMemo: React.FC<ListMemoProps> = async ({ memos, itineraryHomeId }) => {
  const sortedMemos = memos?.sort((a, b) => a.id - b.id);

  return (
    <>
      <h2 className="bg-blue-400 text-xl bold text-white rounded mt-10 mb-12 p-5">
        メモの一覧
      </h2>
      {sortedMemos?.map((memo) => {
        return (
          <div className="bg-blue-200 shadow-md rounded px-8 py-8 mb-10 ">
            <div className="flex justify-between border-b-2 mb-2">
              <div>{memo.name}</div>
              <Link href={`/travel_brochure/${itineraryHomeId}/memo/${memo.id}`}>
                <Button className="btn-small flex items-center">
                  <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                  編集
                </Button>
              </Link>
            </div>
            <div>{memo.content}</div>
          </div>
        );
      })}
    </>
  );
};

export default ListMemo;
