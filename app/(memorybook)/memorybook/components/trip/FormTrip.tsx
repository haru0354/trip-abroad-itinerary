"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "@/app/components/ui/button/Button";
import Input from "@/app/components/ui/form/Input";
import Date from "@/app/components/ui/form/Date";

import type { TripFormState } from "@/app/(memorybook)/memorybook/types/formState";
import type { TripFormType } from "../../types/formType";

type FormTripProps = {
  trip?: Trip | null;
  buttonName: string;
  formAction: (state: TripFormState, data: FormData) => Promise<TripFormState>;
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
}) => {
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
      router.replace(`/memorybook/${state.createdTripId}/itinerary`);
      state.message = "";
    } else if (state.message === "edit") {
      toast.success("旅行を編集しました！");
      state.message = "";
      router.replace("/memorybook/dashboard");
    }
  }, [state.message]);

  return (
    <div>
      <h2 className="bg-itinerary-heading">旅行の追加</h2>
      <div className="flex items-center justify-center">
        <div className="w-full border py-4 px-6 border-itinerary-borderGray rounded bg-white max-w-[620px]">
          <p className="text-center border-b pb-4 border-itinerary-borderGray font-semibold">
            旅行のフォーム
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full py-3">
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
            <Button color="blue" size="normal" className="rounded mt-4">
              {buttonName}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormTrip;
