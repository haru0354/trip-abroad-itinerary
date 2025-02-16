"use client";

import { useState } from "react";

import Checkbox from "@/app/components/ui/form/Checkbox";
import FormLayout from "../../layout/FormLayout";

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
      <FormLayout
        formTitle=" 共有設定を変更"
        buttonName={buttonName}
        action={formAction}
      >
        <Checkbox
          name="share"
          item="共有する(作成した旅程表を他の人が見れるようにします)"
          checked={isShare}
          label="共有設定"
          onChange={handleToggle}
          explanation="作成した旅程表が公開されるので「SNSでの共有」「同行者との旅程表の共有」などあなた以外も旅程表が観れる設定になります。"
          explanationTextRed="作成した旅程表には必ず「個人情報」や「画像」など知られたくない情報を記載しないようにしましょう。"
        />
      </FormLayout>
    </>
  );
};

export default FormShare;
