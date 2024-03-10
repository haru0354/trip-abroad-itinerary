"use client";

import { useState } from "react";
import Button from "../../ui/Button";
import Image from "next/image";
import { deletePostImage } from "@/app/action/action-postImage";
import toast from "react-hot-toast";

type PostImage = {
  id: number;
  url: string;
  altText: string;
};

type DeletePostImageModalProps = {
  postImage: PostImage | null;
};

const DeletePostImageModal: React.FC<DeletePostImageModalProps> = ({
  postImage,
}) => {
  if (!postImage) {
    return <p>削除対象の画像がありません。</p>;
  }

  const deletePostImageWithId = deletePostImage.bind(null, postImage.id);

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
    toast.success("画像を削除しました！");
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
                <p className="py-2 font-bold">「{postImage.altText}」を</p>
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
                    formAction={deletePostImageWithId}
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

export default DeletePostImageModal;
