"use client";
import { useState } from "react";
import Button from "../Button";
import { deleteItinerary } from "@/app/action/action-itinerary";

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

  return (
    <div>
      <div className="flex justify-center items-center">
        {isDeleteModalOpen || (
          <Button onClick={toggleDeleteModal} className="btn red">メモを削除</Button>
        )}
      </div>
      {isDeleteModalOpen && (
        <div className="bg-gray-300 bg-opacity-30 fixed z-50 w-full h-full flex justify-center items-center inset-0 ">
        <div className=" max-w-sm max-h-52 mx-auto py-7 px-7 bg-blue-100 shadow-lg rounded-md w-9/12 h-4/5 mt-12">
          <div className="flex flex-col items-center h-40">
            <h3 className="text-xl">
                {itinerary && <p>[{itinerary.name}]を削除しますか？</p>}
              </h3>
              <div className="flex justify-center mt-auto mr-5">
                <Button onClick={toggleDeleteModal} className="btn gray">キャンセル</Button>
                <form>
                  <Button formAction={deleteItineraryWithId} className="btn red" >削除</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteItineraryModal;
