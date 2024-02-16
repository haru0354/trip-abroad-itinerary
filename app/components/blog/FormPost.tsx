
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
  slug: string;
  updatedDate: string;
};

type FormPostProps = {
  post?: Post | null;
  formAction?: (data: FormData) => Promise<void> | Promise<never>;
  buttonName: string;
  dateName: string;
};

const FormPost: React.FC<FormPostProps> = ({
  post,
  formAction,
  buttonName,
  dateName,
}) => {

  
  return (
    <>
      <form action={formAction}>
        <Date name={dateName} defaultValue={post?.updatedDate} />
        <Form
            name={"category"}
            label={"カテゴリ"}
            defaultValue={post?.category}
            placeholder={"新規カテゴリを追加する場合はこちらに入力。既存のカテゴリは下記より選択。"}
        />
        <Select
            name={"category"}
            label={"カテゴリ"}
            defaultValue={post?.category}
          />
        <Form name={"slug"} label={"スラッグ"} defaultValue={post?.slug} placeholder={"スラッグを入力してください"}/>
        <Form
          name={"title"}
          label={"記事のタイトル"}
          defaultValue={post?.title}
          placeholder={"記事のタイトルを入力してください。"}
        />
        <TextArea
          name={"content"}
          label={"記事の内容"}
          defaultValue={post?.content}
          placeholder={"記事の内容をこちらに入力してください。"}
        />
        <Button className="px-16 py-3 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900">
          {buttonName}
        </Button>
      </form>
    </>
  );
};

export default FormPost;
