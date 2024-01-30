import Form from "../Form";
import Textarea from "../Textarea";
import { addMemo } from "@/app/action/action-memo";
import Button from "../Button";

type Memo = {
  id: number;
  name: string;
  content: string;
};

type FormMemoProps = {
  memo?: Memo | null;
};

const FormMemo: React.FC<FormMemoProps> = ({ memo }) => {
  return (
    <div>
        <Form
          label={"メモの見出し"}
          name={"name"}
          placeholder="メモの見出しを記載しましょう。"
          defaultValue={memo?.name}
        />
        <Textarea
          label={"メモする内容"}
          name={"content"}
          placeholder="メモする内容を記載しましょう。"
          defaultValue={memo?.content}
        />
    </div>
  );
};

export default FormMemo;
