import prisma from "@/app/components/lib/prisma";
import { updateProfile } from "@/app/action/action-profile";
import FormProfile from "@/app/components/itineraryHome/FormProfile";

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
    </>
  );
};

export default Page;
