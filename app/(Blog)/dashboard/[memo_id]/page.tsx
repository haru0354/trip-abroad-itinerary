import { Metadata } from "next";
import Link from "next/link";
import prisma from "../../../components/lib/prisma";

import FormDashboardMemo from "@/app/components/blog/dashboard/FormDashboardMemo";
import Button from "@/app/components/ui/Button";
import DeleteModal from "@/app/components/ui/DeleteModal";

import {
  deleteDashboardMemo,
  updateDashboardMemo,
} from "@/app/action/action-dashboard";

export const metadata: Metadata = {
  title: "個別のメモ",
};

const Page = async ({ params }: { params: { memo_id: string } }) => {
  const id = Number(params.memo_id);
  const updateDashboardMemoWidthId = updateDashboardMemo.bind(null, id);

  const dashboardMemo = await prisma.dashboardMemo.findUnique({
    where: {
      id,
    },
  });

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
