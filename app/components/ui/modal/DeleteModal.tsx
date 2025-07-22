"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

import { useModal } from "@/app/hooks/useModal";
import Modal from "./Modal";
import Button from "@/app/components/ui/button/Button";

import type { DeleteFormState } from "@/app/(memorybook)/memorybook/types/formState";

type DeleteModalProps = {
  DeleteName: string;
  name: string | undefined;
  formAction: (
    state: DeleteFormState,
    data: FormData
  ) => Promise<DeleteFormState>;
  id?: string | undefined;
  tripId?: string | undefined;
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
  const router = useRouter();
  const { closeModal } = useModal();

  const initialState = {
    message: null,
    redirectUrl: null,
  };

  const [state, dispatch] = useFormState<DeleteFormState, FormData>(
    formAction,
    initialState
  );

  useEffect(() => {
    if (!state.message) return;

    const redirectUrl = state.redirectUrl;
    if (state.message === "success" && typeof redirectUrl === "string") {
      toast.success(`${DeleteName}を削除しました！`);
      closeModal(String(id));
      router.push(redirectUrl);
      router.refresh();
    } else {
      toast.error(state.message);
    }
  }, [state.message]);

  if (isItem && !id) {
    return <p>削除対象の{DeleteName}がありません。</p>;
  }

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
        <form action={dispatch}>
          <input type="hidden" name="id" value={id} />
          {tripId && <input type="hidden" name="tripId" value={tripId} />}
          <Button color="red" size="normal" type="submit" className="rounded">
            削除
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default DeleteModal;
