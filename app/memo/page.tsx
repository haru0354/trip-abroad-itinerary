import List from "../components/memo/List";
import Form from "../components/Form";
import Textarea from "../components/Textarea";
import { addMemo } from "../action/action-memo";
import Button from "../components/Button";

const Memo = () => {
    return (
        <main className="flex justify-center p-8">
            <div className="flex justify-center p-8">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96 " action={addMemo}>
                    <Form 
                        label={"メモの見出し"} 
                        name={"name"} 
                        placeholder="メモの見出しを記載しましょう。"
                    />
                    <Textarea 
                        label={"メモする内容"} 
                        name={"content"} 
                        placeholder="メモする内容を記載しましょう。"
                    />
                    <Button>
                        追加
                    </Button>
                </form>
            </div>
            <div>
                <List />
            </div>
        </main>
    )
};

export default Memo;