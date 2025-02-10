"use client";

import { useState } from "react";

import Checkbox from "@/app/components/ui/form/Checkbox";
import Button from "@/app/components/ui/button/Button";

type FormShareProps = {
  trip: Trip | null;
  formAction: (
    data: FormData
  ) => Promise<{ message?: undefined } | { message: string }>;
  buttonName: string;
};

type Trip = {
  id: number;
  startDate?: string | null;
  endDate?: string | null;
  name: string;
  destination?: string | null;
  share: boolean;
};

const FormShare: React.FC<FormShareProps> = ({
  trip,
  formAction,
  buttonName,
}) => {
  const [isShare, setIsShare] = useState<boolean>(trip?.share ?? false);

  const handleToggle = () => {
    setIsShare(!isShare);
  };

  return (
    <>
      <h2 className="bg-itinerary-heading">旅程表の共有</h2>
      <div className="flex items-center justify-center">
        <div className="w-full border py-4 px-6  border-itinerary-borderGray rounded bg-white max-w-[620px]">
          <p className="text-center border-b pb-4 border-itinerary-borderGray font-semibold">
            共有設定を変更
          </p>
          <form action={formAction} className="w-full py-3">
            <Checkbox
              name="share"
              item="共有する(作成した旅程表を他の人が見れるようにします)"
              checked={isShare}
              label="共有設定"
              onChange={handleToggle}
              explanation="作成した旅程表が公開されるので「SNSでの共有」「同行者との旅程表の共有」などあなた以外も旅程表が観れる設定になります。"
              explanation2="作成した旅程表には必ず「個人情報」や「画像」など知られたくない情報を記載しないようにしましょう。"
            />
            <Button size="normal" color="blue" className="rounded mt-8">
              {buttonName}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormShare;
