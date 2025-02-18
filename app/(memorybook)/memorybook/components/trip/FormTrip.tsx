"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useModal } from "@/app/hooks/useModal";
import FormLayout from "../layout/FormLayout";
import Input from "@/app/components/ui/form/Input";
import Date from "@/app/components/ui/form/Date";

import type { TripFormState } from "@/app/(memorybook)/memorybook/types/formState";
import type { TripFormType } from "../../types/formType";

type FormTripProps = {
  trip?: Trip | null;
  buttonName: string;
  formAction: (state: TripFormState, data: FormData) => Promise<TripFormState>;
  modalLayout?: boolean;
  modalId?: string;
};

type Trip = {
  id: number;
  startDate?: string | null;
  endDate?: string | null;
  name: string;
  destination?: string | null;
  share: boolean;
};

const FormTrip: React.FC<FormTripProps> = ({
  trip,
  buttonName,
  formAction,
  modalLayout,
  modalId,
}) => {
  const { closeModal } = useModal();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripFormType>({
    mode: "onBlur",
  });

  const initialState = { message: null, errors: { name: undefined } };
  const [state, dispatch] = useFormState<TripFormState, FormData>(
    formAction,
    initialState
  );

  const onSubmit: SubmitHandler<TripFormType> = (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("startDate", data.startDate || "");
      formData.append("endDate", data.endDate || "");
      formData.append("destination", data.destination || "");

      dispatch(formData);
    } catch (error) {
      console.error("旅行の追加中にエラーが発生:", error);
      toast.error("Googleログイン中にエラーが発生しました。" + error);
    }
  };

  useEffect(() => {
    if (state.message === "add") {
      toast.success("旅行を保存しました！");
      state.message = "";

      if (modalId) {
        closeModal(modalId);
      }

      router.replace(`/memorybook/${state.createdTripId}/itinerary`);
    } else if (state.message === "edit") {
      toast.success("旅行を編集しました！");
      state.message = "";

      if (modalId) {
        closeModal(modalId);
      }
      router.replace("/memorybook/dashboard");
    }
  }, [state.message]);

  return (
    <>
      <FormLayout
        formTitle="旅行のしおりフォーム"
        buttonName={buttonName}
        onSubmit={handleSubmit(onSubmit)}
        modalLayout={modalLayout}
      >
        <Date
          name="startDate"
          label="出発日(未記入も可)"
          defaultValue={trip?.startDate || ""}
          register={register}
        />
        <Date
          name="endDate"
          label="帰宅日(未記入も可)"
          defaultValue={trip?.endDate || ""}
          register={register}
        />
        <Input
          label="旅行タイトル"
          name="name"
          placeholder="旅行タイトルを入力。例)初海外旅行"
          defaultValue={trip?.name || ""}
          register={register}
          required
          error={errors.name?.message || state.errors?.name}
        />
        <Input
          label="旅行先(未記入も可)"
          name="destination"
          placeholder="旅行先が決まっていれば入力"
          register={register}
          defaultValue={trip?.destination || ""}
        />
        {state.errors && state.message && (
          <p className="text-red-500">{state.message}</p>
        )}
      </FormLayout>
    </>
  );
};

export default FormTrip;
