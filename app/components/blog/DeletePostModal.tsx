"use client"

import { useState } from "react";
import Button from "../ui/Button";
import Image from "next/image";
import { deletePost } from "@/app/action/action-post";
import toast from "react-hot-toast";

type Post = {
  id: number;
  createdDate: string;
  updatedDate: string;
  category: string;
  title: string;
  content: string;
}

type DeletePostModalProps = {
  post?: Post | null;
}

const DeletePostModal:React.FC<DeletePostModalProps> = ({ post }) => {

  if (!post) {
    return <p>削除対象の記事がありません。</p>;
  }

  const deletePostWithId = deletePost.bind(null, post.id);


  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState<boolean>(false) 

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen((isDeleteModalOpen) => !isDeleteModalOpen)
  }

  const closeModal = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.target === e.currentTarget) {
      toggleDeleteModal();
    }
  };

  const deleteToast = async () => {
    toast.success("記事を削除しました！")
  };

  return (
    <>
    <div>
      <div className="flex justify-center items-center">
        {isDeleteModalOpen || (
          <Button onClick={toggleDeleteModal} className="px-24 my-8 py-3 shadow font-bold bg-red-700 text-white hover:bg-white hover:text-black border border-red-900">
            ブログの記事を削除
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
                objectFit="contain"
              ></Image>
            </div>
            <div>
              <p className="text-center p-4 font-bold">{post.title}</p>
            </div>
            <div>
              <Button onClick={toggleDeleteModal} className="btn gray">
                キャンセル
              </Button>
              <form onSubmit={deleteToast} >
                <Button formAction={deletePostWithId} className="btn red">
                  削除
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
)
}

export default DeletePostModal