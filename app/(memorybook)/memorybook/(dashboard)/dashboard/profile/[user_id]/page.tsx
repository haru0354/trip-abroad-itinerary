import Link from "next/link";

import { updatePassword } from "@/app/(memorybook)/memorybook/action/actionProfile";
import FormEmail from "@/app/(memorybook)/memorybook/components/user/form/FormEmail";
import FormPassword from "@/app/(memorybook)/memorybook/components/user/form/FormPassword";
import DeleteUserModal from "@/app/(memorybook)/memorybook/components/user/DeleteUserModal";
import Button from "@/app/components/ui/button/Button";

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
      <FormPassword formAction={updatePassword} buttonName="保存する" />
      <DeleteUserModal />
    </>
  );
};

export default Page;
