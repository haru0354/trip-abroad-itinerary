import Modal from "@/app/components/ui/modal/Modal";
import FormDeleteUser from "../form/FormDeleteUser";

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
      <Modal
        maxWidth="max-w-[620px]"
        buttonName="アカウントの削除"
        id="delete-user"
      >
        <FormDeleteUser modalId="delete-user" />
      </Modal>
    </>
  );
};

export default DeleteUserModal;
