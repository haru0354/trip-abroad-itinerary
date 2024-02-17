import Form from "../ui/Form";
import Button from "../ui/Button";

type Category = {
  name: string;
  slug: string;
  content: string;
};

type FormCategoryProps = {
  category?: Category;
  buttonName: string;
  formAction?: (data: FormData) => Promise<void> | Promise<never>;
};

const FormCategory: React.FC<FormCategoryProps> = ({
  category,
  buttonName,
  formAction,
}) => {
  return (
    <>
      <form action={formAction}>
        <Form
          name={"name"}
          label={"カテゴリ名"}
          placeholder={"カテゴリ名を入力してください。"}
          defaultValue={category?.name}
        />
        <Form
          name={"slug"}
          label={"スラッグ"}
          placeholder={"カテゴリのスラッグを入力してください。"}
          defaultValue={category?.slug}
        />
        <Form
          name={"content"}
          label={"コンテント"}
          placeholder={"カテゴリの内容コンテントを入力してください。この項目は必須ではありません。"}
          defaultValue={category?.content}
        />
        <Form
          name={"description"}
          label={"カテゴリの説明(description)"}
          placeholder={"カテゴリの説明(description)を入力してください。この項目は必須ではありません。"}
          defaultValue={category?.content}
        />
        <Button className="px-16 py-3 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900">
          {buttonName}
        </Button>
      </form>
    </>
  );
};

export default FormCategory;
