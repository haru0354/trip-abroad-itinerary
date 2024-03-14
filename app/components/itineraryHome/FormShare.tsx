"use client";

import { useState } from "react";
import Checkbox from "../ui/Checkbox";
import Button from "../ui/Button";

type FormShareProps = {
  itineraryHome: ItineraryHome | null;
  formAction: (data: FormData) => Promise<void>;
  buttonName: string;
  userId: number | undefined;
};

type ItineraryHome = {
  id: number;
  startDate?: string | null;
  endDate?: string | null;
  name: string;
  destination?: string | null;
  share: boolean;
};

const FormShare: React.FC<FormShareProps> = ({
  itineraryHome,
  formAction,
  buttonName,
  userId,
}) => {
  const [isShare, setIsShare] = useState<boolean>(itineraryHome?.share ?? false); 

  const handleToggle = () => {
    setIsShare(!isShare);
  };
 
  return (
    <>
      <h2>旅程表の共有</h2>
      <div className="flex items-center justify-center">
        <div className="w-full border py-4 px-6  border-gray-300 rounded bg-white max-w-[620px]">
          <p className="text-center border-b pb-4 border-gray-300 text-gray-600 font-bold">
            共有を変更
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
            <input type="hidden" name="userId" value={userId} />
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
