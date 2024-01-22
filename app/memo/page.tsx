import List from "../components/List";
import Form from "../components/Form";
import Textarea from "../components/Textarea";
import { addTodo } from "../lib/action";
import AddButton from "../ui/Button";

const Memo = () => {
    return (
        <main className="flex justify-center p-8">
            <div className="flex justify-center items-center p-8">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96 " action={addTodo}>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">メモの見出し</label>
                    <Form />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">メモする内容</label>
                    <Textarea/>
                </div>
                <AddButton />
                </form>
            </div>
            <div>
                <List />
            </div>
        </main>
    )
};

export default Memo;