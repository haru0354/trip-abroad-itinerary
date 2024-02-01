import prisma from "../../components/lib/prisma";
import { updateMemo } from "../../action/action-memo";
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
              <FormMemo formAction={updateMemoWidthId} memo={memo} buttonName={"保存"}/>
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
