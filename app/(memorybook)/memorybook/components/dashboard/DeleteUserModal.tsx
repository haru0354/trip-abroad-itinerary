"use client";

import { useState } from "react";
import Image from "next/image";
import { deleteUser } from "@/app/(memorybook)/memorybook/action/actionProfile";
import Button from "@/app/components/ui/Button";

const DeleteUserModal = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const toggleDeleteModal = () => setIsDeleteModalOpen((prev) => !prev);

  const closeModal = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.target === e.currentTarget) {
      toggleDeleteModal();
    }
  };

  return (
    <div>
      <h2 className="bg-itinerary-heading">アカウントの削除</h2>
      <p>アカウントを削除するのはこちらより行うことができます</p>
      <ul className="border border-itinerary-borderBlack px-12 py-4 my-4 mx-10 list-decimal">
        <li>登録したアカウント</li>
        <li>作成した旅行</li>
        <li>作成した旅程表</li>
        <li>作成したメモ</li>
        <li>共有した旅程表・ブログ</li>
      </ul>
      <p className="text-red-500 font-semibold">
        削除をするとこれらのデータは完全に消去され、復旧をすることはできなくなります。
      </p>
      <div className="flex justify-center items-center my-10">
        {isDeleteModalOpen || (
          <Button
            onClick={toggleDeleteModal}
            color="red"
            size="normal"
            className="rounded mt-4"
          >
            アカウントを削除
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
              <p className="py-2 font-bold">「アカウント」を削除しますか？</p>
              <p className="font-bold text-red-500">
                アカウントや登録したデータは削除されます。削除すると元に戻すことはできなくなります。
              </p>
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
              <form>
                <Button
                  formAction={deleteUser}
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

export default DeleteUserModal;
