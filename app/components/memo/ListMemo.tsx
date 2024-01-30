import prisma from "../lib/prisma";
import Button from "../Button";
import Link from 'next/link';

const ListMemo = async () => {

    const memos = await prisma.memo.findMany();
    const sortedMemos = memos.sort((a,b) => a.id - b.id);

    return (
        <>
            <h2>メモの一覧</h2>
            {sortedMemos.map(memo => {
                return (
                    <div className="bg-blue-200 shadow-md rounded px-8 py-8 mb-10" key={memo.id} >
                        <div className="border-b-2">{memo.name}</div>
                        <div>{memo.content}</div>
                        <Link href={`/memo/${memo.id}`}>
                            <Button>
                                編集
                            </Button>
                        </Link>
                    </div>
                )
            })}  
        </>
    )
}

export default ListMemo;