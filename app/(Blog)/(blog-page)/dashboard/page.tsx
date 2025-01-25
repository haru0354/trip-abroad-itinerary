import { addDashboardMemo } from "@/app/(blog)/action/actionDashboard";
import FormDashboardMemo from "../../components/dashboard/form/FormDashboardMemo";
import ListDashboardMemo from "../../components/dashboard/list/ListDashboardMemo";
import HeadingTwo from "../../components/ui/dashboard/HeadingTwo";

const Memo = async () => {
  return (
    <>
      <ListDashboardMemo />
      <HeadingTwo>メモの追加</HeadingTwo>
      <FormDashboardMemo formAction={addDashboardMemo} buttonName="追加" />
    </>
  );
};

export default Memo;
