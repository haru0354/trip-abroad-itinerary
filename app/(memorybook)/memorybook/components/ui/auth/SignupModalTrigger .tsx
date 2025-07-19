"use client";

import Button from "@/app/components/ui/button/Button";
import { useModal } from "@/app/hooks/useModal";

type Props = {
  id: string;
  textButton?: boolean;
};

const SignupModalTrigger: React.FC<Props> = ({ id, textButton = false }) => {
  const { openModal } = useModal();

  return textButton ? (
    <p onClick={() => openModal(id)} className="cursor-pointer mb-0">
      しおりを作成
    </p>
  ) : (
    <Button
      onClick={() => openModal(id)}
      type="button"
      className="rounded my-4"
      color="blue"
      size="normal"
    >
      しおりを作成
    </Button>
  );
};

export default SignupModalTrigger;
