"use client";

import { useState } from "react";
import Button from "../ui/Button";
import Form from "../ui/Form";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import Date from "../ui/Date";
import Checkbox from "../ui/Checkbox";

type FormItineraryHomeProps = {
  itineraryHome?: ItineraryHome | null;
  buttonName: string;
  userId?: number | undefined;
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
  userId,
  formAction,
}) => {
  const router = useRouter();
  const initialState = { message: null, errors: { name: undefined } };
  const [state, dispatch] = useFormState<FormState, FormData>(
    formAction,
    initialState
  );

  const [isShare, setIsShare] = useState<boolean>(
    itineraryHome?.share ?? false
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

  const handleToggle = () => {
    setIsShare(!isShare);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await formAction(state, formData);
    switch (result.message) {
      case "add":
        toast.success("旅行を保存しました！");
        const createdItineraryHomeId = result.createdItineraryHomeId;
        router.replace(`/travel_brochure/${createdItineraryHomeId}/itinerary`);
        break;
      case "edit":
        toast.success("旅行を編集しました！");
        router.replace("/travel_brochure/home");
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
          <p className="text-center border-b pb-4 border-gray-300 text-gray-600 font-bold">
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
            <Checkbox
              name="share"
              item="共有する(作成した旅程表を他の人が見れるようにします)"
              checked={isShare}
              label="共有設定"
              onChange={handleToggle}
              explanation="作成した旅程表が公開されるので「SNSでの共有」「同行者との旅程表の共有」などあなた以外も旅程表が観れる設定になります。"
              explanation2="作成した旅程表には必ず「個人情報」や「画像」など知られたくない情報を記載しないようにしましょう。"
            />
            <input type="hidden" name="userId" value={userId} />
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
