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
    <main>
      <div className="main-contents-area">
        <div className="contents-area">
          <div>
            <form>
              <FormMemo memo={memo} />
              <Button formAction={updateMemoWidthId}>保存</Button>
            </form>
          </div>
          <div>
            <DeleteModal memo={memo} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
