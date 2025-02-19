import Link from "next/link";

import { updateProfile } from "@/app/(memorybook)/memorybook/action/actionProfile";
import { updatePassword } from "@/app/(memorybook)/memorybook/action/actionProfile";
import { getCurrentUser } from "@/app/lib/getCurrentUser";
import FormProfile from "@/app/(memorybook)/memorybook/components/user/form/FormProfile";
import FormPassword from "@/app/(memorybook)/memorybook/components/user/form/FormPassword";
import Button from "@/app/components/ui/button/Button";
import DeleteUserModal from "@/app/(memorybook)/memorybook/components/user/DeleteUserModal";
import FormEmail from "@/app/(memorybook)/memorybook/components/user/form/FormEmail";

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    console.error("ログイン中のユーザーデータが見つかりませんでした。");
    return;
  }

  return (
    <>
      <h2 className="bg-itinerary-heading">メールアドレスの変更</h2>
      <FormEmail
        formAction={updateProfile}
        buttonName="保存する"
        userName={user?.name || undefined}
        userEmail={user?.email || undefined}
      />
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
