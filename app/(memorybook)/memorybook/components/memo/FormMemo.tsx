"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useModal } from "@/app/hooks/useModal";
import FormLayout from "../layout/FormLayout";
import Input from "@/app/components/ui/form/Input";
import TextArea from "@/app/components/ui/form/TextArea";
import InputHidden from "@/app/components/ui/form/InputHidden";

import type { MemoFormState } from "../../types/formState";
import type { MemoFormType } from "../../types/formType";

type FormMemoProps = {
  memos?: Memo[] | undefined | null;
  memo?: Memo | null;
  buttonName: string;
  formAction: (state: MemoFormState, data: FormData) => Promise<MemoFormState>;
  tripId: number | undefined;
  modalLayout?: boolean;
};

type Memo = {
  id: number;
  name: string;
  content: string;
};

const FormMemo: React.FC<FormMemoProps> = ({
  memo,
  buttonName,
  formAction,
  tripId,
  modalLayout = false,
}) => {
  const router = useRouter();
  const { closeModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemoFormType>({
    mode: "onBlur",
  });

  const initialState = { message: null, errors: { name: undefined } };
  const [state, dispatch] = useFormState<MemoFormState, FormData>(
    formAction,
    initialState
  );

  const onSubmit: SubmitHandler<MemoFormType> = (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("content", data.content || "");
      formData.append("tripId", data.tripId);

      dispatch(formData);
    } catch (error) {
      console.error("エラーが発生しました:", error);
      toast.error("エラーが発生しました。" + error);
    }
  };

  useEffect(() => {
    if (state.message === "add") {
      toast.success("メモを保存しました！");
      closeModal();
    } else if (state.message === "edit") {
      toast.success("メモを編集しました！");
      router.replace(`/memorybook/${tripId}/memo`);
    }
  }, [state.message]);

  return (
    <FormLayout
      formTitle="メモのフォーム"
      buttonName={buttonName}
      onSubmit={handleSubmit(onSubmit)}
      modalLayout={modalLayout}
    >
      <Input
        label="メモタイトル"
        name="name"
        placeholder="メモタイトルを記載しましょう。"
        defaultValue={memo?.name}
        register={register}
        required={true}
        error={errors.name?.message || state.errors?.name}
      />
      <TextArea
        label="メモする内容"
        name="content"
        placeholder="メモする内容を記載しましょう。"
        defaultValue={memo?.content}
        register={register}
        error={state.errors?.name}
      />
      <InputHidden name="tripId" value={tripId} register={register} />
      {state.message && state.message !== "edit" && state.message !== "add" && (
        <p className="text-red-500">{state.message}</p>
      )}
    </FormLayout>
  );
};

export default FormMemo;
