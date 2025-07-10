"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { useModal } from "@/app/hooks/useModal";
import FormLayout from "../layout/FormLayout";
import Input from "@/app/components/ui/form/Input";
import TextArea from "@/app/components/ui/form/TextArea";
import InputHidden from "@/app/components/ui/form/InputHidden";

import { memoSchema } from "../../schema/memoSchema";
import type { Memo } from "@prisma/client";
import type { MemoFormState } from "../../types/formState";
import type { MemoFormType } from "../../types/formType";

type FormMemoProps = {
  memos?: Memo[] | undefined | null;
  memo?: Memo | null;
  buttonName: string;
  formAction: (state: MemoFormState, data: FormData) => Promise<MemoFormState>;
  tripId: number | undefined;
  modalId?: string;
};

const FormMemo: React.FC<FormMemoProps> = ({
  memo,
  buttonName,
  formAction,
  tripId,
  modalId,
}) => {
  const modalLayout = modalId ? true : false;
  const router = useRouter();
  const { closeModal } = useModal();

  const {
    register,
    formState: { errors },
  } = useForm<MemoFormType>({
    mode: "onBlur",
    resolver: zodResolver(memoSchema),
  });

  const initialState = { message: null, errors: { name: undefined } };
  const [state, dispatch] = useFormState<MemoFormState, FormData>(
    formAction,
    initialState
  );

  useEffect(() => {
    if (state.message === "add") {
      toast.success("メモを保存しました！");

      if (modalId) {
        closeModal(modalId);
      }
    } else if (state.message === "edit") {
      toast.success("メモを編集しました！");

      if (modalId) {
        closeModal(modalId);
      }

      router.replace(`/memorybook/${tripId}/memo`);
    }
  }, [state.message, modalId, closeModal, router, tripId]);

  return (
    <FormLayout
      formTitle="メモのフォーム"
      buttonName={buttonName}
      action={dispatch}
      modalLayout={modalLayout}
    >
      <Input
        label="メモタイトル"
        name="name"
        placeholder="メモタイトルを記載しましょう。"
        defaultValue={memo?.name}
        register={register}
        error={errors.name?.message || state.errors?.name}
      />
      <TextArea
        label="メモする内容"
        name="content"
        placeholder="メモする内容を記載しましょう。"
        defaultValue={memo?.content}
        register={register}
        error={state.errors?.content}
      />
      <InputHidden name="tripId" value={tripId} register={register} />
      {state.message && state.message !== "edit" && state.message !== "add" && (
        <p className="text-red-500">{state.message}</p>
      )}
    </FormLayout>
  );
};

export default FormMemo;
