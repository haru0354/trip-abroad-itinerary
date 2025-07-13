"use client";

import { createPortal } from "react-dom";
import Image from "next/image";
import toast from "react-hot-toast";

import { useModal } from "@/app/hooks/useModal";
import Button from "@/app/components/ui/button/Button";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";

type DeleteImageModalProps = {
  imageUrl: string;
  imageAlt: string;
  tripId: string;
  itineraryId: string;
  formAction: (data: FormData) => Promise<{ message: string } | undefined>;
};

const DeleteImageModal: React.FC<DeleteImageModalProps> = ({
  imageUrl,
  imageAlt,
  tripId,
  itineraryId,
  formAction,
}) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleSubmit = () => {
    toast.success(`画像ファイル「${imageAlt}」を削除しました！`);
    closeModal("deleteImageModal");
  };

  return (
    <>
      <Button
        onClick={() => openModal("deleteImageModal")}
        color="white"
        size="small"
        type="button"
        className="rounded my-4"
      >
        画像の削除
      </Button>
      {isModalOpen("deleteImageModal") &&
        createPortal(
          <AnimatedItem
            onClick={() => closeModal("deleteImageModal")}
            className="fixed flex z-[200] justify-center items-center w-full h-full top-0 left-0 bg-gray-500 bg-opacity-90"
            elementType="div"
            animation="fadeInVariants"
          >
            <div
              className="relative w-full max-w-[300px] max-h-[70vh] mx-2 border rounded border-gray-500 bg-white overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center">
                <Image
                  src={imageUrl}
                  alt="削除する"
                  width={300}
                  height={250}
                />
              </div>
              <div className="my-6 text-center font-bold">
                <p>画像ファイル「{imageAlt}」</p>
                <p>を削除しますか？</p>
                <p className="text-red-500">
                  削除されるのは画像ファイルのみとなります。旅程は削除されません。
                </p>
              </div>
              <div className="pb-2">
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="id" value={itineraryId} />
                  <input type="hidden" name="tripId" value={tripId} />
                  <Button
                    formAction={formAction}
                    color="red"
                    size="normal"
                    type="submit"
                    className="rounded"
                  >
                    削除
                  </Button>
                </form>
              </div>
              <Button
                onClick={() => closeModal("deleteImageModal")}
                color="gray"
                size="normal"
                type="button"
                className="rounded my-4"
              >
                キャンセル
              </Button>
            </div>
          </AnimatedItem>,
          document.body
        )}
    </>
  );
};

export default DeleteImageModal;
