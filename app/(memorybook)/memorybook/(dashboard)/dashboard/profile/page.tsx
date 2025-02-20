import { getUserProfile } from "@/app/lib/getCurrentUser";
import ListProfile from "../../../components/user/list/ListProfile";
import ChangeEmailFormModal from "../../../components/user/modal/ChangeEmailFormModal";
import ChangePasswordFormModal from "../../../components/user/modal/ChangePasswordFormModal";

const page = async () => {
  const user = await getUserProfile();

  if (!user) {
    console.error("ログイン中のユーザーデータが見つかりませんでした。");
    return;
  }

  return (
    <>
      <h2 className="bg-itinerary-heading">プロフィール</h2>
      <ListProfile userEmail={user?.email} userName={user?.name} />
      <div className="flex flex-col items-center justify-center md:flex-row max-w-[620px] mx-auto my-8">
        <ChangeEmailFormModal />
        <ChangePasswordFormModal />
      </div>
    </>
  );
};

export default page;
