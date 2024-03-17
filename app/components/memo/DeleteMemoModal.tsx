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
  itineraryHomeId?: number | undefined;
};

const DeleteMemoModal: React.FC<DeleteModalProps> = ({
  memo,
  itineraryHomeId,
}) => {
  if (!memo) {
    return <p>削除対象のメモがありません。</p>;
  }

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const toggleDeleteModal = () => setIsDeleteModalOpen((prev) => !prev);

  const deleteMemoWithId = deleteMemo.bind(null, memo.id);

  const closeModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleDeleteModal();
    }
  };

  const deleteToast = () => {
    toast.success("メモを削除しました！");
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        {isDeleteModalOpen || (
          <Button
            onClick={toggleDeleteModal}
            color="red"
            size="normal"
            className="rounded mt-4"
          >
            メモを削除
          </Button>
        )}
      </div>
      {isDeleteModalOpen && (
        <div
          className="bg-gray-200 bg-opacity-40 fixed z-50 w-full h-full flex justify-center items-center inset-0"
          onClick={closeModal}
        >
          <div className="border rounded mx-auto bg-blue-100 w-[300px]">
            <div>
              <Image
                src="/delete-modal01.JPG"
                alt="削除する"
                width={300}
                height={250}
              />
            </div>
            <div className="my-6 text-center">
              <p className="py-2 font-bold">「{memo.name}」を</p>
              <p className="font-bold">削除しますか？</p>
            </div>
            <div className="pb-8">
              <Button
                onClick={toggleDeleteModal}
                color="gray"
                size="normal"
                className="rounded mt-4"
              >
                キャンセル
              </Button>
              <form onSubmit={deleteToast}>
                <input
                  type="hidden"
                  name="itineraryHomeId"
                  value={itineraryHomeId}
                />
                <Button
                  formAction={deleteMemoWithId}
                  color="red"
                  size="normal"
                  className="rounded mt-4"
                >
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
