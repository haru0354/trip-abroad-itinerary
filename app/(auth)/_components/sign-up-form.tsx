import Button from "@/app/components/ui/Button";
import Form from "@/app/components/ui/Form";

const SignUp = () => {
  return (
    <div className="flex">
      <div className="flex items-center">
        <form action="">000
          <Form label={"ニックネーム"} />
          <Form label={"メールアドレス"} />
          <Form label={"パスワード"} />
          <Button className="btn blue w-11">アカウント作成</Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
