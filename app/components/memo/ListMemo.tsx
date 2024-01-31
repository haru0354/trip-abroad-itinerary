import prisma from "../lib/prisma";
import Button from "../Button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const ListMemo = async () => {
  const memos = await prisma.memo.findMany();
  const sortedMemos = memos.sort((a, b) => a.id - b.id);

  return (
    <>
      <h2>メモの一覧</h2>
      {sortedMemos.map((memo) => {
        return (
          <div className="bg-blue-200 shadow-md rounded px-8 py-8 mb-10 ">
            <div className="flex justify-between border-b-2 mb-2">
              <div>{memo.name}</div>
              <Link href={`/memo/${memo.id}`}>
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
