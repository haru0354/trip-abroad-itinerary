import { getUserProfile } from "@/app/lib/getCurrentUser";
import ListProfile from "../../../components/user/list/ListProfile";
import Button from "@/app/components/ui/button/Button";
import ChangeEmailFormModal from "../../../components/user/modal/ChangeEmailFormModal";

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
      <ChangeEmailFormModal />
      <Button color="blue" size="normal">
        メールアドレスの変更
      </Button>
      <Button color="blue" size="normal">
        パスワードの変更
      </Button>
    </>
  );
};

export default page;
