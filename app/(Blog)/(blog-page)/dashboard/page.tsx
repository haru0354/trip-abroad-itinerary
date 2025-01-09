import { addDashboardMemo } from "@/app/(blog)/action/actionDashboard";
import FormDashboardMemo from "../../components/dashboard/form/FormDashboardMemo";
import ListDashboardMemo from "../../components/dashboard/list/ListDashboardMemo";

const Memo = async () => {
  return (
    <>
      <ListDashboardMemo />
      <FormDashboardMemo formAction={addDashboardMemo} buttonName="追加" />
    </>
  );
};

export default Memo;
