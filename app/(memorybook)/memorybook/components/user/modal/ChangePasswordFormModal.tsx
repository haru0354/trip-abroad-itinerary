import Modal from "@/app/components/ui/modal/Modal";
import FormPassword from "../form/FormPassword";

const ChangePasswordFormModal = () => {
  return (
    <Modal maxWidth="max-w-[620px]" buttonName="パスワードの変更" id="password">
      <FormPassword modalId="password" />
    </Modal>
  );
};

export default ChangePasswordFormModal;
