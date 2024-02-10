"use client";
import { useState } from "react";
import Button from "../ui/Button";
import { deleteMemo } from "../../action/action-memo";
import Image from "next/image";
import toast from "react-hot-toast";

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

  const closeModal = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.target === e.currentTarget) {
      toggleDeleteModal();
    }
  };

  const deleteToast = async () => {
    toast.success("メモを削除しました！")
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        {isDeleteModalOpen || (
          <Button onClick={toggleDeleteModal} className="btn red">
            メモを削除
          </Button>
        )}
      </div>
      {isDeleteModalOpen && (
        <div
          className="bg-gray-200  bg-opacity-40 fixed z-50 w-full h-full flex justify-center items-center inset-0"
          onClick={closeModal}
        >
          <div className="border rounded mx-auto bg-blue-100 w-[250px]">
            <div>
              <Image
                src="/WS000000.JPG"
                alt="削除する"
                width={250}
                height={250}
                objectFit="contain"
              ></Image>
            </div>
            <div>
              <p className="text-center p-4 font-bold">{memo.name}</p>
            </div>
            <div>
              <Button onClick={toggleDeleteModal} className="btn gray">
                キャンセル
              </Button>
              <form onSubmit={deleteToast} >
                <Button formAction={deleteMemoWithId} className="btn red ">
                  削除
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteMemoModal;
