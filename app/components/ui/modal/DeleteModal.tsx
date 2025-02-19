"use client";

import Image from "next/image";
import toast from "react-hot-toast";

import { useModal } from "@/app/hooks/useModal";
import Modal from "./Modal";
import Button from "@/app/components/ui/button/Button";

type DeleteModalProps = {
  DeleteName: string;
  name: string | undefined;
  formAction: (data: FormData) => Promise<{ message: string } | undefined>;
  id?: number | undefined;
  tripId?: number | undefined;
  isItem?: boolean;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  DeleteName,
  name,
  formAction,
  tripId,
  id,
  isItem = true,
}) => {
  const { closeModal } = useModal();

  if (isItem && !id) {
    return <p>削除対象の{DeleteName}がありません。</p>;
  }

  const handleSubmit = () => {
    toast.success(`${DeleteName}を削除しました！`);
    closeModal(String(id));
  };

  return (
    <Modal
      maxWidth="max-w-[300px]"
      buttonName={`${DeleteName}を削除`}
      closeButtonName="キャンセル"
      color="red"
      paddingNothing={true}
      id={String(id)}
    >
      <div className="flex justify-center">
        <Image
          src="/delete-modal01.jpg"
          alt="削除する"
          width={300}
          height={250}
        />
      </div>
      <div className="my-6 text-center font-bold">
        <p>「{name}」</p>
        <p>削除しますか？</p>
        <p className="text-red-500">
          登録されたデータは削除されます。削除されたデータは元に戻すことはできません。
        </p>
      </div>
      <div className="pb-2">
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={id} />
          {tripId && <input type="hidden" name="tripId" value={tripId} />}
          <Button
            formAction={formAction}
            color="red"
            size="normal"
            className="rounded"
          >
            削除
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default DeleteModal;
