import prisma from "../../action/prisma";
import { deleteMemo, updateMemo } from "../../action/action-memo";
import Button from "../button/Button";

const List = async () => {
    const memos = await prisma.memo.findMany();

    return (
        <div>
            <h2>メモの一覧</h2>
            {memos.map(memo => {
                return (
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80" key={memo.id} >
                        <div className="border-b-2">{memo.name}</div>
                        <div className="form-control textarea">{memo.content}</div>
                        <form action={updateMemo}>
                        <input type="text" name="name" defaultValue={memo?.name} /> 
                        <input type="text" name="content" defaultValue={memo?.content} />   
                        <Button>
                            編集
                        </Button>
                        </form>
                        <form action={deleteMemo}>
                        <input type="hidden" name="id" value={memo.id} />  
                        <Button>
                            削除
                        </Button>
                        </form>      
                    </div>
                )
            })}  
        </div>
    )
}

export default List;