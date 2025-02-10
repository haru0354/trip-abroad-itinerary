import Link from "next/link";
import { updateProfile } from "@/app/(memorybook)/memorybook/action/actionProfile";
import { updatePassword } from "@/app/(memorybook)/memorybook/action/actionProfile";
import { getCurrentUserId } from "@/app/lib/getCurrentUser";
import prisma from "@/app/lib/prisma";
import FormProfile from "@/app/(memorybook)/memorybook/components/dashboard/form/FormProfile";
import FormPassword from "@/app/(memorybook)/memorybook/components/dashboard/form/FormPassword";
import Button from "@/app/components/ui/button/Button";
import DeleteUserModal from "@/app/(memorybook)/memorybook/components/dashboard/DeleteUserModal";

const Page = async () => {
  const userId = await getCurrentUserId();

  if (!userId) {
    console.error("認証がされていません。");
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    console.error("アカウントが見つかりませんでした");
    return;
  }

  return (
    <>
      <FormProfile
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
