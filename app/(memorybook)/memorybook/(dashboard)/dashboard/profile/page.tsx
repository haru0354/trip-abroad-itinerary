import { getUserProfile } from "@/app/lib/getCurrentUser";
import ListProfile from "../../../components/user/list/ListProfile";
import ChangeEmailFormModal from "../../../components/user/modal/ChangeEmailFormModal";
import ChangePasswordFormModal from "../../../components/user/modal/ChangePasswordFormModal";
import DeleteUserModal from "../../../components/user/modal/DeleteUserModal";

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
      <h2 className="bg-itinerary-heading">アカウントの削除</h2>
      <p>アカウントの削除はこちらより行うことができます</p>
      <p>アカウントの削除と共に下記の項目も全て削除されます。</p>
      <ul className=" px-12 py-4 my-4 mx-10 list-decimal border border-itinerary-borderBlack">
        <li>登録したアカウント</li>
        <li>作成した旅行</li>
        <li>作成した旅程表</li>
        <li>作成したメモ</li>
        <li>共有した旅程表・ブログ</li>
      </ul>
      <p className="font-semibold text-red-500">
        削除をするとこれらのデータは完全に消去され、復旧をすることはできなくなります。
      </p>
      <DeleteUserModal />
    </>
  );
};

export default page;
