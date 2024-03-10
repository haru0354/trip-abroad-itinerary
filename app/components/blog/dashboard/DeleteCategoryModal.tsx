"use client";

import { useState } from "react";
import Button from "../../ui/Button";
import Image from "next/image";
import { deleteCategory } from "@/app/action/action-category";
import toast from "react-hot-toast";

type Category = {
  id: number;
  name: string;
};

type DeleteCategoryModalProps = {
  category?: Category | null;
};

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
  category,
}) => {
  if (!category) {
    return <p>削除対象のカテゴリがありません。</p>;
  }

  const deleteCategoryWithId = deleteCategory.bind(null, category.id);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen((isDeleteModalOpen) => !isDeleteModalOpen);
  };

  const closeModal = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.target === e.currentTarget) {
      toggleDeleteModal();
    }
  };

  const deleteToast = () => {
    toast.success("カテゴリを削除しました！");
  };

  return (
    <>
      <div>
        <div className="flex justify-center items-center">
          {isDeleteModalOpen || (
            <Button
              onClick={toggleDeleteModal}
              color="red"
              size="normal"
              className="rounded mt-4"
            >
              削除
            </Button>
          )}
        </div>
        {isDeleteModalOpen && (
          <div
            className="bg-gray-200  bg-opacity-40 fixed z-50 w-full h-full flex justify-center items-center inset-0"
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
                <p className="py-2 font-bold">「{category.name}」を</p>
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
                  <Button
                    formAction={deleteCategoryWithId}
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
    </>
  );
};

export default DeleteCategoryModal;
