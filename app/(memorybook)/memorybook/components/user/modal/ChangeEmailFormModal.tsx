import Modal from "@/app/components/ui/modal/Modal";
import FormEmail from "../form/FormEmail";

const ChangeEmailFormModal = () => {
  return (
    <Modal maxWidth="max-w-[620px]" buttonName="メールアドレスの変更" id="email">
      <FormEmail modalId="email" />
    </Modal>
  );
};

export default ChangeEmailFormModal;
