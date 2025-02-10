"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/form/Input";
import Date from "@/app/components/ui/form/Date";

import type { TripFormState } from "@/app/(memorybook)/memorybook/types/formState";

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
  const [startDateValue, setStartDateValue] = useState<string>(
    trip?.startDate || ""
  );
  const [endDateValue, setEndDateValue] = useState<string>(trip?.endDate || "");
  const [nameValue, setNameValue] = useState<string>(trip?.name || "");
  const [destinationValue, setDestinationValue] = useState<string>(
    trip?.destination || ""
  );

  const initialState = { message: null, errors: { name: undefined } };
  const [state, dispatch] = useFormState<TripFormState, FormData>(
    formAction,
    initialState
  );

  useEffect(() => {
    if (state.message === "add") {
      toast.success("旅行を保存しました！");
      router.replace(`/memorybook/${state.createdTripId}/itinerary`);
      state.message = "";
    } else if (state.message === "edit") {
      toast.success("旅行を編集しました！");
      state.message = "";
      router.replace("/memorybook/dashboard");
    } else if (state.message === "failure") {
      toast.error("旅行の保存に失敗しました。");
    }
  }, [state.message]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDateValue(e.target.value);
  };
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDateValue(e.target.value);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestinationValue(e.target.value);
  };

  return (
    <div>
      <h2 className="bg-itinerary-heading">旅行の追加</h2>
      <div className="flex items-center justify-center">
        <div className="w-full border py-4 px-6 border-itinerary-borderGray rounded bg-white max-w-[620px]">
          <p className="text-center border-b pb-4 border-itinerary-borderGray font-semibold">
            旅行のフォーム
          </p>
          <form action={dispatch} className="w-full py-3">
            <Date
              name="startDate"
              label="出発日(未記入も可)"
              onChange={handleStartDateChange}
              value={startDateValue}
            />
            <Date
              name="endDate"
              label="帰宅日(未記入も可)"
              onChange={handleEndDateChange}
              value={endDateValue}
            />
            <Input
              label="旅行タイトル"
              name="name"
              placeholder="旅行タイトルを入力。例)初海外旅行"
              onChange={handleNameChange}
              value={nameValue}
            />
            {state.errors && state.errors.name && (
              <p className="text-red-500">{state.errors.name}</p>
            )}
            <Input
              label="旅行先(未記入も可)"
              name="destination"
              placeholder="旅行先が決まっていれば入力"
              onChange={handleDestinationChange}
              value={destinationValue}
            />
            {state.errors && state.message !== "failure" && (
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
