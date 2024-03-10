import { Metadata } from "next";
import FormDashboardMemo from "@/app/components/blog/dashboard/FormDashboardMemo";
import DeleteDashboardMemoModal from "@/app/components/blog/dashboard/DeleteDashboardMemoModal";
import prisma from "../../../components/lib/prisma";
import { updateDashboardMemo } from "@/app/action/action-dashboard";
import Button from "@/app/components/ui/Button";
import Link from "next/link";

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
      <DeleteDashboardMemoModal dashboardMemo={dashboardMemo} />
    </>
  );
};

export default Page;
