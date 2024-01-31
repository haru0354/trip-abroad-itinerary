"use client";
import { useState } from "react";
import Button from "../Button";
import { deleteItinerary } from "@/app/action/action-itinerary";
import Image from "next/image";

type Itinerary = {
  id: number;
  date: string;
  time: string;
  name: string;
  content: string;
  hideContent: string;
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
        <div className="bg-gray-200  bg-opacity-40 fixed z-50 w-full h-full flex justify-center items-center inset-0" onClick={closeModal}>
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
              <p className="text-center p-4 font-bold">{itinerary.name}</p>
            </div>
            <div>
              <Button onClick={toggleDeleteModal} className="btn gray">
                キャンセル
              </Button>
              <form>
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
