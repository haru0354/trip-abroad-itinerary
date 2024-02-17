import Form from "../ui/Form";
import Button from "../ui/Button";

type Category = {
  name: string;
  slag: string
}

type FormCategoryProps = {
  category?: Category;
  buttonName: string;
  formAction?: (data: FormData) => Promise<void> | Promise<never>;
}

const FormCategory: React.FC<FormCategoryProps> = ({ category, buttonName, formAction }) => {
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
          name={"slag"}
          label={"スラッグ"}
          placeholder={"カテゴリのスラッグを入力してください。"}
          defaultValue={category?.slag}
        />
        <Button className="px-16 py-3 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900">
          {buttonName}
        </Button>
      </form>
    </>
  );
};

export default FormCategory;
