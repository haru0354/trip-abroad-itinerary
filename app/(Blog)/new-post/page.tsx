import TextArea from "@/app/components/ui/TextArea";
import Form from "@/app/components/ui/Form";
import Button from "@/app/components/ui/Button";
import Date from "@/app/components/ui/Date";
import { addBlog } from "@/app/action/action-post";

const page = () => {
  return (
    <>
      <div>
        <h2 className="bg-green-600 text-xl bold text-white rounded mt-10 mb-12 p-5 font-bold">
          記事の追加
        </h2>
        <form action={addBlog}>
        <Date name={"createdDate"} />
        <Form name={"category"} label={"カテゴリ"} />
        <Form name={"slug"} label={"スラッグ"} />
        <Form name={"title"} label={"記事のタイトル"} />
        <TextArea name={"content"} label={"記事の内容"} />
        <Button className="px-16 py-3 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900">
          記事を追加する
        </Button>
        </form>
      </div>
    </>
  );
};

export default page;
