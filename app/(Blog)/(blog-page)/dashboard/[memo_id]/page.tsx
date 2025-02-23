import Link from "next/link";
import { Metadata } from "next";

import {
  deleteDashboardMemo,
  updateDashboardMemo,
} from "@/app/(blog)/action/actionDashboard";
import { getDashboardMemo } from "@/app/(blog)/lib/service/blogServiceUnique";
import FormDashboardMemo from "@/app/(blog)/components/dashboard/form/FormDashboardMemo";
import Button from "@/app/components/ui/button/Button";
import DeleteModal from "@/app/components/ui/modal/DeleteModal";

export const metadata: Metadata = {
  title: "個別のメモ",
};

const Page = async ({ params }: { params: { memo_id: string } }) => {
  const id = Number(params.memo_id);
  const updateDashboardMemoWidthId = updateDashboardMemo.bind(null, id);
  const dashboardMemo = await getDashboardMemo(params.memo_id);

  return (
    <>
      <FormDashboardMemo
        formAction={updateDashboardMemoWidthId}
        dashboardMemo={dashboardMemo}
        buttonName={"保存"}
      />
      <Link href="/dashboard/">
        <Button color="gray" size="normal" className="rounded mt-4">
          キャンセル
        </Button>
      </Link>
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
