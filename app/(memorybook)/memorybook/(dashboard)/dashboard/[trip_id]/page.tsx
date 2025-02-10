import Link from "next/link";
import { getTrip } from "../../../lib/memoryBookService";
import { updateShare } from "../../../action/actionTrip";
import Button from "@/app/components/ui/button/Button";
import FormShare from "../../../components/dashboard/form/FormShare";

const Page = async ({ params }: { params: { trip_id: string } }) => {
  const id = Number(params.trip_id);
  const updateShareWidthId = updateShare.bind(null, id);
  const trip = await getTrip(params.trip_id);

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
