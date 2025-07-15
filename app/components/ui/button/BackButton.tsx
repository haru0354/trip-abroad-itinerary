"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      type="button"
      color="gray"
      size="normal"
      className="my-8 rounded"
    >
      前のページに戻る
    </Button>
  );
};

export default BackButton;
