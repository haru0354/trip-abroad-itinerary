"use client";
import { useState } from "react";
import Button from "../Button";
import { deleteMemo } from "../../action/action-memo";

type Memo = {
  id: number;
  name: string;
  content: string;
  isCompleted: boolean;
};

type DeleteModalProps = {
  memo?: Memo | null;
};

const DeleteMemoModal: React.FC<DeleteModalProps> = ({ memo }) => {
  if (!memo) {
    return <p>削除対象のメモがありません。</p>;
  }

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const toggleDeleteModal = () => setIsDeleteModalOpen((prev) => !prev);

  const deleteMemoWithId = deleteMemo.bind(null, memo.id);

  return (
    <div>
      <div className="flex justify-center items-center">
        {isDeleteModalOpen || (
          <Button onClick={toggleDeleteModal}>メモを削除</Button>
        )}
      </div>
      {isDeleteModalOpen && (
        <div className="bg-gray-300 bg-opacity-30 fixed z-50 w-full h-full flex justify-center items-center inset-0 ">
          <div className=" max-w-sm max-h-52 mx-auto py-7 px-7 bg-blue-100 shadow-lg rounded-md w-9/12 h-4/5 mt-12">
            <div className="flex flex-col items-center h-40">
              <h3 className="text-xl">
                {memo && <p>[{memo.name}]を削除しますか？</p>}
              </h3>
              <div className="flex justify-center mt-auto mr-5">
                <Button onClick={toggleDeleteModal}>キャンセル</Button>
                <form>
                  <Button formAction={deleteMemoWithId}>削除</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteMemoModal;
