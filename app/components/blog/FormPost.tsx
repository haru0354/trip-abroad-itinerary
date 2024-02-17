import TextArea from "@/app/components/ui/TextArea";
import Form from "@/app/components/ui/Form";
import Button from "@/app/components/ui/Button";
import Date from "@/app/components/ui/Date";
import Select from "../ui/Select";

type Post = {
  id: number;
  title: string;
  content: string;
  category: string;
  slag: string;
  updatedDate: string;
};

type FormPostProps = {
  post?: Post | null;
  formAction?: (data: FormData) => Promise<void> | Promise<never>;
  buttonName: string;
};

const FormPost: React.FC<FormPostProps> = ({
  post,
  formAction,
  buttonName,
}) => {
  return (
    <>
      <form action={formAction}>
        <Form
          name={"title"}
          label={"記事のタイトル"}
          defaultValue={post?.title}
          placeholder={"記事のタイトルを31文字を目安に入力してください。"}
        />
        <Select label={"カテゴリ"} name={"categoryId"}/>
        <Form
          name={"slug"}
          label={"スラッグ"}
          defaultValue={post?.slag}
          placeholder={"記事のスラッグを入力してください。"}
        />
        <TextArea
          name={"content"}
          label={"記事の内容"}
          defaultValue={post?.content}
          placeholder={"記事の内容をこちらに入力してください。"}
        />
        <TextArea
          name={"description"}
          label={"記事の説明(description)"}
          defaultValue={post?.content}
          placeholder={"120文字を目安に記入してください。"}
        />
        <Button className="px-16 py-3 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900">
          {buttonName}
        </Button>
      </form>
    </>
  );
};

export default FormPost;
