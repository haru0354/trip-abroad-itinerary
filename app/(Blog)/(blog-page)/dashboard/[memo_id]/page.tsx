import { Metadata } from "next";

import {
  deleteDashboardMemo,
  updateDashboardMemo,
} from "@/app/(blog)/action/actionDashboard";
import { getDashboardMemo } from "@/app/(blog)/lib/service/blogServiceUnique";

import FormDashboardMemo from "@/app/(blog)/components/dashboard/form/FormDashboardMemo";
import DeleteModal from "@/app/components/ui/modal/DeleteModal";
import ButtonNextLink from "@/app/components/ui/button/ButtonNextLink";
import HeadingTwo from "@/app/(blog)/components/ui/dashboard/HeadingTwo";

export const metadata: Metadata = {
  title: "個別のメモ",
};

const Page = async ({ params }: { params: { memo_id: string } }) => {
  const id = Number(params.memo_id);
  const updateDashboardMemoWidthId = updateDashboardMemo.bind(null, id);
  const dashboardMemo = await getDashboardMemo(params.memo_id);

  return (
    <>
      <HeadingTwo>メモの編集</HeadingTwo>
      <FormDashboardMemo
        formAction={updateDashboardMemoWidthId}
        dashboardMemo={dashboardMemo}
        buttonName={"保存"}
      />
      <div className="text-center">
        <ButtonNextLink href="/dashboard" color="gray" className="mt-4 rounded">
          キャンセル
        </ButtonNextLink>
      </div>
      <DeleteModal
        DeleteName="メモ"
        name={dashboardMemo?.name}
        formAction={deleteDashboardMemo}
        id={dashboardMemo?.id}
      />
    </>
  );
};

export default Page;
