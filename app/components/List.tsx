import prisma from "../lib/prisma";
import { addTodo } from "../lib/action";

const List = async () => {
    const todos = await prisma.memo.findMany();

    return (
        <div>
            <h2>メモの一覧</h2>
            {todos.map(todo => {
                return (
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80" key={todo.id} >
                        <div className="border-b-2">{todo.name}</div>
                        <div className="form-control textarea">{todo.content}</div>
                        <button>保存</button>
                        <button>削除</button>
                    </div>
                )
            })}  
        </div>
    )
}

export default List;