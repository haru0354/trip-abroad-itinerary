import { getUserProfile } from "@/app/lib/getCurrentUser";
import ListProfile from "../../../components/user/list/ListProfile";

const page = async () => {
  const user = await getUserProfile();

  if (!user) {
    console.error("ログイン中のユーザーデータが見つかりませんでした。");
    return;
  }

  return (
    <ListProfile
      userEmail={user?.email || undefined}
      userName={user?.name || undefined}
      userId={user?.id}
    />
  );
};

export default page;
