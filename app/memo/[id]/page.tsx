import prisma from '../../action/prisma';
import { updateMemo } from '../../action/action-memo';
import Button from '@/app/components/button/Button';

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
      <label className="block text-gray-700 text-sm font-bold mb-2">メモの見出し</label>
        <input
          type="text"
          name="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          defaultValue={memo?.name}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">メモする内容</label>
        <textarea
          name="content"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          defaultValue={memo?.content}
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

