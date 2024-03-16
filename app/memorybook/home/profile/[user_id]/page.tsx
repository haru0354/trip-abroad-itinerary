import prisma from "@/app/components/lib/prisma";
import { updateProfile } from "@/app/action/action-profile";
import FormProfile from "@/app/components/itineraryHome/FormProfile";
import Link from "next/link";
import Button from "@/app/components/ui/Button";
import DeleteUserModal from "@/app/components/itineraryHome/DeleteUserModal";

const Page = async ({ params }: { params: { user_id: string } }) => {
  const id = Number(params.user_id);
  const updateProfileWidthId = updateProfile.bind(null, id);

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
      <DeleteUserModal userId={id}/>
    </>
  );
};

export default Page;
