"use client";

import { useState } from "react";
import Button from "../ui/Button";
import Image from "next/image";
import toast from "react-hot-toast";

type DeleteModalProps = {
  DeleteName: string;
  name: string | undefined;
  formAction: (data: FormData) => Promise<{ message: string } | undefined>;
  id: number | undefined;
  itineraryHomeId?: number | undefined;
  userId?: number | undefined;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  DeleteName,
  name,
  formAction,
  itineraryHomeId,
  id,
  userId,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const toggleDeleteModal = () => setIsDeleteModalOpen((prev) => !prev);

  if (!id) {
    return <p>削除対象の{DeleteName}がありません。</p>;
  }

  const closeModal = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.target === e.currentTarget) {
      toggleDeleteModal();
    }
  };

  const deleteToast = () => {
    toast.success(`${DeleteName}を削除しました！`);
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
            {DeleteName}を削除
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
                src="/delete-modal01.jpg"
                alt="削除する"
                width={300}
                height={250}
              />
            </div>
            <div className="my-6 text-center">
              <p className="py-2 font-bold">「{name}」を</p>
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
                <input type="hidden" name="id" value={id} />
                {itineraryHomeId && (
                  <input
                    type="hidden"
                    name="itineraryHomeId"
                    value={itineraryHomeId}
                  />
                )}
                {userId && <input type="hidden" name="userId" value={userId} />}
                <Button
                  formAction={formAction}
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

export default DeleteModal;
