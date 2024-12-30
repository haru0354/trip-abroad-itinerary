import Link from "next/link";
import { updateProfile } from "@/app/(memorybook)/memorybook/action/action-profile";
import { updatePassword } from "@/app/(memorybook)/memorybook/action/action-profile";
import prisma from "@/app/lib/prisma";
import FormProfile from "@/app/components/itineraryHome/FormProfile";
import Button from "@/app/components/ui/Button";
import DeleteUserModal from "@/app/components/itineraryHome/DeleteUserModal";
import FormPassword from "@/app/components/itineraryHome/FormPassword";

const Page = async ({ params }: { params: { user_id: string } }) => {
  const id = Number(params.user_id);
  const updateProfileWidthId = updateProfile.bind(null, id);
  const updatePasswordWidthId = updatePassword.bind(null, id);

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return (
    <>
      <FormProfile
        formAction={updateProfileWidthId}
        buttonName="保存する"
        userName={user?.name || undefined}
        userEmail={user?.email || undefined}
      />
      <Link href="/memorybook/home/profile/">
        <Button color="gray" size="normal" className="rounded mt-4">
          キャンセル
        </Button>
      </Link>
      <FormPassword formAction={updatePasswordWidthId} buttonName="保存する" />
      <DeleteUserModal userId={id} />
    </>
  );
};

export default Page;
