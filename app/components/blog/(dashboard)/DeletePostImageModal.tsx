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
              className="px-24 my-8 py-3 shadow font-bold bg-red-700 text-white hover:bg-white hover:text-black border border-red-900"
            >
              画像を削除
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
                  src="/delete-modal.JPG"
                  alt="削除する"
                  width={250}
                  height={250}
                />
              </div>
              <div>
                <p className="text-center p-4 font-bold">{postImage.altText}</p>
              </div>
              <div>
                <Button onClick={toggleDeleteModal} className="btn gray">
                  キャンセル
                </Button>
                <form onSubmit={deleteToast}>
                  <Button
                    formAction={deletePostImageWithId}
                    className="btn red"
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
