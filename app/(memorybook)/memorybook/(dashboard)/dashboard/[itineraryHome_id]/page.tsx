import Link from "next/link";
import { getItineraryHome } from "../../../lib/memoryBookService";
import { updateShare } from "../../../action/actionTrip";
import Button from "@/app/components/ui/Button";
import FormShare from "../../../components/dashboard/form/FormShare";

const Page = async ({ params }: { params: { itineraryHome_id: string } }) => {
  const id = Number(params.itineraryHome_id);
  const updateShareWidthId = updateShare.bind(null, id);
  const itineraryHome = await getItineraryHome(params.itineraryHome_id);

  return (
    <>
      <FormShare
        itineraryHome={itineraryHome}
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
