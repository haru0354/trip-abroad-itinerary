import Link from "next/link";
import { updateProfile } from "@/app/(memorybook)/memorybook/action/actionProfile";
import { updatePassword } from "@/app/(memorybook)/memorybook/action/actionProfile";
import prisma from "@/app/lib/prisma";
import FormProfile from "@/app/(memorybook)/memorybook/components/dashboard/form/FormProfile";
import FormPassword from "@/app/(memorybook)/memorybook/components/dashboard/form/FormPassword";
import Button from "@/app/components/ui/Button";
import DeleteUserModal from "@/app/(memorybook)/memorybook/components/dashboard/DeleteUserModal";

const Page = async ({ params }: { params: { user_id: string } }) => {
  const id = Number(params.user_id);

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

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
