import Link from "next/link";

import FormEmail from "@/app/(memorybook)/memorybook/components/user/form/FormEmail";
import FormPassword from "@/app/(memorybook)/memorybook/components/user/form/FormPassword";
import DeleteUserModal from "@/app/(memorybook)/memorybook/components/user/modal/DeleteUserModal";
import Button from "@/app/components/ui/button/Button";
import FormDeleteUser from "@/app/(memorybook)/memorybook/components/user/form/FormDeleteUser";

const Page = async () => {
  return (
    <>
      <h2 className="bg-itinerary-heading">メールアドレスの変更</h2>
      <FormEmail />
      <Link href="/memorybook/dashboard/profile/">
        <Button color="gray" size="normal" className="rounded mt-4">
          キャンセル
        </Button>
      </Link>
      <h2 className="bg-itinerary-heading">パスワードの変更</h2>
      <FormPassword />
      <h2 className="bg-itinerary-heading">アカウントの削除</h2>
      <FormDeleteUser />
    </>
  );
};

export default Page;
