import prisma from '../../lib/prisma';
import { updateMemo } from '../../action/action-memo';
import Button from '@/app/components/Button';
import Textarea from '@/app/components/Textarea';
import Form from '@/app/components/Form';

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const updateMemoId = updateMemo.bind(null, id);
  const memo = await prisma.memo.findUnique({
    where: {
      id,
    },
  });

  return (
    <main className="flex justify-center p-8">
      <div className="flex justify-center p-8">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96" action={updateMemoId} >
      <div>
        <Form 
          name={"name"}
          label={"メモの見出し"}
          defaultValue={memo?.name}
          placeholder='変更する内容を記載しましょう。'
        />
        <Textarea
          name={"content"}
          label={"メモする内容"}
          defaultValue={memo?.content}
          placeholder='変更する内容を記載しましょう。'
        />
      </div>
      <Button>
        保存
      </Button>
      </form>
    </div>
    </main>
  );
}

