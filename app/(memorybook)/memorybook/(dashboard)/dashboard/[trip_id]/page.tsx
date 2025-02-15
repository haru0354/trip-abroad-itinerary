import Link from "next/link";

import { getTrip } from "../../../lib/memoryBookService";
import { updateShare } from "../../../action/actionTrip";
import Button from "@/app/components/ui/button/Button";
import FormShare from "../../../components/user/form/FormShare";

const Page = async ({ params }: { params: { trip_id: string } }) => {
  const tripId = Number(params.trip_id);
  const updateShareWidthId = updateShare.bind(null, tripId);
  const trip = await getTrip(tripId);

  if (!trip) {
    console.error("個別の旅行データの取得に失敗しました。");
    return;
  }

  return (
    <>
      <FormShare
        trip={trip}
        formAction={updateShareWidthId}
        buttonName="保存"
      />
      <Link href="/memorybook/dashboard">
        <Button color="gray" size="normal" className="rounded mt-4">
          キャンセル
        </Button>
      </Link>
    </>
  );
};

export default Page;
