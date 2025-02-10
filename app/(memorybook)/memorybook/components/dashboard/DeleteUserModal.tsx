import { deleteUser } from "@/app/(memorybook)/memorybook/action/actionProfile";
import DeleteModal from "@/app/components/ui/modal/DeleteModal";

const DeleteUserModal = () => {
  return (
    <>
      <h2 className="bg-itinerary-heading">アカウントの削除</h2>
      <p>アカウントを削除するのはこちらより行うことができます</p>
      <ul className="border border-itinerary-borderBlack px-12 py-4 my-4 mx-10 list-decimal">
        <li>登録したアカウント</li>
        <li>作成した旅行</li>
        <li>作成した旅程表</li>
        <li>作成したメモ</li>
        <li>共有した旅程表・ブログ</li>
      </ul>
      <p className="text-red-500 font-semibold">
        削除をするとこれらのデータは完全に消去され、復旧をすることはできなくなります。
      </p>
      <DeleteModal
        DeleteName="アカウント"
        name="アカウント"
        formAction={deleteUser}
        isItem={false}
      />
    </>
  );
};

export default DeleteUserModal;
