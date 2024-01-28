import prisma from "../lib/prisma";
import Button from "../Button";
import Link from 'next/link';

const ListMemo = async () => {

    const memos = await prisma.memo.findMany();
    const sortedMemos = memos.sort((a,b) => a.id - b.id);

    return (
        <div>
            <h2>メモの一覧</h2>
            {sortedMemos.map(memo => {
                return (
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80" key={memo.id} >
                        <div className="border-b-2">{memo.name}</div>
                        <div className="form-control textarea">{memo.content}</div>
                        <Link href={`/memo/${memo.id}`}>
                            <Button>
                                編集
                            </Button>
                        </Link>
                    </div>
                )
            })}  
        </div>
    )
}

export default ListMemo;