"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/app/components/ui/Button";
import Form from "@/app/components/ui/Form";
import Date from "@/app/components/ui/Date";

type FormItineraryHomeProps = {
  itineraryHome?: ItineraryHome | null;
  buttonName: string;
  formAction: (state: FormState, data: FormData) => Promise<FormState>;
};

type ItineraryHome = {
  id: number;
  startDate?: string | null;
  endDate?: string | null;
  name: string;
  destination?: string | null;
  share: boolean;
};

type FormState = {
  message?: string | null;
  errors?: {
    startDate?: string[] | undefined;
    endDate?: string[] | undefined;
    name?: string[] | undefined;
    destination?: string[] | undefined;
  };
  createdItineraryHomeId?: number | null;
};

const FormItineraryHome: React.FC<FormItineraryHomeProps> = ({
  itineraryHome,
  buttonName,
  formAction,
}) => {
  const router = useRouter();
  const initialState = { message: null, errors: { name: undefined } };
  const [state, dispatch] = useFormState<FormState, FormData>(
    formAction,
    initialState
  );

  const [errorMessage, setErrorMessage] = useState<FormState>();
  const [startDateValue, setStartDateValue] = useState<string>(
    itineraryHome?.startDate || ""
  );
  const [endDateValue, setEndDateValue] = useState<string>(
    itineraryHome?.endDate || ""
  );
  const [nameValue, setNameValue] = useState<string>(itineraryHome?.name || "");
  const [destinationValue, setDestinationValue] = useState<string>(
    itineraryHome?.destination || ""
  );

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await formAction(state, formData);
    switch (result.message) {
      case "add":
        toast.success("旅行を保存しました！");
        const createdItineraryHomeId = result.createdItineraryHomeId;
        router.replace(`/memorybook/${createdItineraryHomeId}/itinerary`);
        break;
      case "edit":
        toast.success("旅行を編集しました！");
        router.replace("/memorybook/dashboard");
        break;
      default:
        setErrorMessage(result);
        break;
    }
  };

  return (
    <div>
      <h2>旅行の追加</h2>
      <div className="flex items-center justify-center">
        <div className="w-full border py-4 px-6  border-gray-300 rounded bg-white max-w-[620px]">
          <p className="text-center border-b pb-4 border-gray-300 text-gray-600 font-semibold">
            旅行のフォーム
          </p>
          <form onSubmit={handleSubmit} className="w-full py-3">
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
            <Form
              label="旅行タイトル"
              name="name"
              placeholder="旅行タイトルを入力。例)初海外旅行"
              onChange={handleNameChange}
              value={nameValue}
            />
            {errorMessage &&
              errorMessage.errors &&
              errorMessage.errors.name && (
                <p className="text-red-500">{errorMessage.errors.name}</p>
              )}
            <Form
              label="旅行先(未記入も可)"
              name="destination"
              placeholder="旅行先が決まっていれば入力"
              onChange={handleDestinationChange}
              value={destinationValue}
            />
            {errorMessage && errorMessage.message !== "failure" && (
              <p className="text-red-500">{errorMessage.message}</p>
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

export default FormItineraryHome;
