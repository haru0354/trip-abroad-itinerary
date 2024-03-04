"use client";
import { useState } from "react";
import Button from "../ui/Button";
import { deleteItinerary } from "@/app/action/action-itinerary";
import Image from "next/image";
import toast from "react-hot-toast";

type Itinerary = {
  id: number;
  date: string;
  time: string;
  name: string;
  content: string | null;
  hideContent: string | null;
  isShowContent: boolean;
};

type DeleteModalProps = {
  itinerary?: Itinerary | null;
};

const DeleteItineraryModal: React.FC<DeleteModalProps> = ({ itinerary }) => {
  if (!itinerary) {
    return <p>削除対象の旅程がありません。</p>;
  }

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const toggleDeleteModal = () => setIsDeleteModalOpen((prev) => !prev);

  const deleteItineraryWithId = deleteItinerary.bind(null, itinerary.id);

  const closeModal = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.target === e.currentTarget) {
      toggleDeleteModal();
    }
  };

  const deleteToast = () => {
    toast.success("旅程を削除しました！")
  }

  return (
    <div>
      <div className="flex justify-center items-center">
        {isDeleteModalOpen || (
          <Button onClick={toggleDeleteModal} className="btn red">
            旅程を削除
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
              <p className="text-center p-4 font-bold">{itinerary.name}</p>
            </div>
            <div>
              <Button onClick={toggleDeleteModal} className="btn gray">
                キャンセル
              </Button>
              <form onSubmit={deleteToast}>
                <Button formAction={deleteItineraryWithId} className="btn red ">
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

export default DeleteItineraryModal;
