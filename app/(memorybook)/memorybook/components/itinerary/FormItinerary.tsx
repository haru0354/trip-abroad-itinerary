"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { useModal } from "@/app/hooks/useModal";
import { deleteItineraryImage } from "../../action/actionItinerary";
import DeleteImageModal from "@/app/components/ui/modal/DeleteImageModal";
import FormLayout from "../layout/FormLayout";
import Input from "@/app/components/ui/form/Input";
import InputHidden from "@/app/components/ui/form/InputHidden";
import TextArea from "@/app/components/ui/form/TextArea";
import Date from "@/app/components/ui/form/Date";
import Time from "@/app/components/ui/form/Time";
import FormImage from "@/app/components/ui/form/FormImage";

import { itinerarySchema } from "../../schema/itinerarySchema";
import type { Itinerary } from "@prisma/client";
import type { ItineraryFormState } from "@/app/(memorybook)/memorybook/types/formState";
import type { ItineraryFormType } from "../../types/formType";

type FormItineraryProps = {
  itinerary?: Itinerary | null;
  buttonName: string;
  formAction: (
    state: ItineraryFormState,
    data: FormData
  ) => Promise<ItineraryFormState>;
  tripId: string | undefined;
  modalId?: string;
};

const FormItinerary: React.FC<FormItineraryProps> = ({
  itinerary,
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
  } = useForm<ItineraryFormType>({
    mode: "onBlur",
    resolver: zodResolver(itinerarySchema),
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const initialState = {
    message: null,
    errors: {
      date: undefined,
      time: undefined,
      name: undefined,
      altText: undefined,
    },
  };
  const [state, dispatch] = useFormState<ItineraryFormState, FormData>(
    formAction,
    initialState
  );

  useEffect(() => {
    if (state.message === "add") {
      setFormSubmitted((prev) => !prev);
      toast.success("旅程を保存しました！");

      if (modalId) {
        closeModal(modalId);
      }
    } else if (state.message === "edit") {
      toast.success("旅程を編集しました！");

      if (modalId) {
        closeModal(modalId);
      }
      router.replace(`/memorybook/${tripId}/itinerary/`);
    }
  }, [state.message, modalId, closeModal, router, tripId]);

  return (
    <FormLayout
      formTitle="旅程表のフォーム"
      buttonName={buttonName}
      action={dispatch}
      modalLayout={modalLayout}
    >
      <Date
        label="日付"
        name="date"
        defaultValue={itinerary?.date}
        register={register}
        error={errors.date?.message || state.errors?.date}
      />
      <Time
        label="時間"
        name="time"
        defaultValue={itinerary?.time}
        register={register}
        error={errors.time?.message || state.errors?.time}
      />
      <Input
        label="目的（何をするのか）"
        name="name"
        placeholder="観光なら「観光地名」移動なら「電車名」など"
        defaultValue={itinerary?.name}
        register={register}
        error={errors.name?.message || state.errors?.name}
      />
      <TextArea
        label="補足情報"
        placeholder="観光地なら服装の注意。レストランなら食べる予定の料理名などメモを記載しましょう。"
        name="content"
        defaultValue={itinerary?.content}
        register={register}
      />
      <TextArea
        label="補足情報2"
        placeholder="ボタンクリックで表示されるエリアです。電車なら乗り換え方法など必要な場面でのみ見たい情報を入力。"
        name="hideContent"
        defaultValue={itinerary?.hideContent}
        register={register}
      />
      <FormImage
        state={state}
        selectImage={itinerary}
        formSubmitted={formSubmitted}
        register={register}
        defaultValue={itinerary?.altText}
      />
      {itinerary?.url && itinerary?.altText && tripId && (
        <DeleteImageModal
          imageUrl={itinerary.url}
          imageAlt={itinerary.altText}
          tripId={tripId}
          itineraryId={itinerary.id}
          formAction={deleteItineraryImage}
        />
      )}
      <InputHidden name="tripId" value={tripId} register={register} />
      {state.message && state.message !== "edit" && state.message !== "add" && (
        <p className="text-red-500">{state.message}</p>
      )}
    </FormLayout>
  );
};

export default FormItinerary;
