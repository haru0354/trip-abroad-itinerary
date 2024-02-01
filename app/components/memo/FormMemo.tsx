import Button from "../Button";
import Form from "../Form";
import Textarea from "../Textarea";

type Memo = {
  id: number;
  name: string;
  content: string;
};

type FormMemoProps = {
  memo?: Memo | null;
  buttonName: string;
  formAction: (data: FormData) => Promise<void> | Promise<never> | null;
};

const FormMemo: React.FC<FormMemoProps> = ({ memo, buttonName, formAction }) => {

  return (
    <div>
      <form action={formAction}>
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
        <Button className="btn blue">{buttonName}</Button>
      </form>
    </div>
  );
};

export default FormMemo;
