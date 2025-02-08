"use client";

import toast from "react-hot-toast";

import Image from "next/image";
import Button from "./Button";
import Modal from "./Modal";

type DeleteModalProps = {
  DeleteName: string;
  name: string | undefined;
  formAction: (data: FormData) => Promise<{ message: string } | undefined>;
  id: number | undefined;
  tripId?: number | undefined;
};

const Mo: React.FC<DeleteModalProps> = ({
  DeleteName,
  name,
  formAction,
  tripId,
  id,
}) => {
  if (!id) {
    return <p>削除対象の{DeleteName}がありません。</p>;
  }

  const deleteToast = () => {
    toast.success(`${DeleteName}を削除しました！`);
  };

  return (
    <Modal
      maxWidth="max-w-[300px]"
      buttonName={`${DeleteName}を削除`}
      closeButtonName="キャンセル"
      color="red"
      paddingNothing={true}
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
        <p className="text-red-500">削除すると復元することはできません。</p>
      </div>
      <div className="pb-2">
        <form onSubmit={deleteToast}>
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

export default Mo;
