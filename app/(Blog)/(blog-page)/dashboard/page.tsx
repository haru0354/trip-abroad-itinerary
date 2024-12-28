import { addDashboardMemo } from "@/app/action/action-dashboard";
import FormDashboardMemo from "@/app/components/blog/dashboard/FormDashboardMemo";
import ListDashboardMemo from "@/app/components/blog/dashboard/ListDashboardMemo";

const Memo = async () => {
  return (
    <>
      <ListDashboardMemo />
      <FormDashboardMemo formAction={addDashboardMemo} buttonName="追加" />
    </>
  );
};

export default Memo;
