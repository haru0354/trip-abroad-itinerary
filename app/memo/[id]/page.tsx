import prisma from "../../components/lib/prisma";
import { updateMemo, deleteMemo } from "../../action/action-memo";
import Button from "@/app/components/Button";

import FormMemo from "@/app/components/memo/FormMemo";
import DeleteModal from "@/app/components/memo/DeleteMemoModal";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const updateMemoWidthId = updateMemo.bind(null, id);

  const memo = await prisma.memo.findUnique({
    where: {
      id,
    },
  });


  return (
    <main className="flex justify-center p-8">
      <div className="flex justify-center p-8">
        <div className="flex flex-col space-y-4">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
            <FormMemo memo={memo} />
            <Button formAction={updateMemoWidthId}>保存</Button>
          </form>
        </div>
        <DeleteModal memo={memo} />
      </div>
    </main>
  );
};

export default Page;
