import Modal from "@/app/components/ui/modal/Modal";
import FormDeleteUser from "../form/FormDeleteUser";

const DeleteUserModal = () => {
  return (
    <Modal
      maxWidth="max-w-[620px]"
      buttonName="アカウントの削除"
      id="delete-user"
      color="red"
    >
      <FormDeleteUser modalId="delete-user" />
    </Modal>
  );
};

export default DeleteUserModal;
