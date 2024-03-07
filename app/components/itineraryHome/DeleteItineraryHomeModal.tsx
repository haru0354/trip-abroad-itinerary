"use client";
import { useState } from "react";
import Button from "../ui/Button";
import Image from "next/image";
import toast from "react-hot-toast";
import { deleteItineraryHome } from "@/app/action/action-ItineraryHome";

type ItineraryHome = {
  id: number;
  name: string;
};

type DeleteModalProps = {
  itineraryHome?: ItineraryHome | null;
  itineraryHomeId?: number | undefined;
};

const DeleteItineraryHomeModal: React.FC<DeleteModalProps> = ({
  itineraryHome,
  itineraryHomeId,
}) => {
  if (!itineraryHome) {
    return <p>削除対象の旅行がありません。</p>;
  }

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const toggleDeleteModal = () => setIsDeleteModalOpen((prev) => !prev);

  const deleteItineraryHomeWithId = deleteItineraryHome.bind(null, itineraryHome.id);

  const closeModal = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.target === e.currentTarget) {
      toggleDeleteModal();
    }
  };

  const deleteToast = () => {
    toast.success("旅行を削除しました！");
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        {isDeleteModalOpen || (
          <Button onClick={toggleDeleteModal} className="btn red">
            旅行を削除
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
              <p className="text-center p-4 font-bold">{itineraryHome.name}</p>
            </div>
            <div>
              <Button onClick={toggleDeleteModal} className="btn gray">
                キャンセル
              </Button>
              <form onSubmit={deleteToast}>
                <input
                  type="hidden"
                  name="itineraryHomeId"
                  value={itineraryHomeId}
                />
                <Button formAction={deleteItineraryHomeWithId} className="btn red ">
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

export default DeleteItineraryHomeModal;
