"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/app/components/ui/Button";
import Form from "@/app/components/ui/Form";

type FormProfileProps = {
  buttonName: string;
  formAction: (state: FormState, data: FormData) => Promise<FormState>;
  userEmail: string | undefined;
  userName: string | undefined;
};

type FormState = {
  message?: string | null;
  errors?: {
    name?: string[] | undefined;
    email?: string[] | undefined;
  };
};

const FormProfile: React.FC<FormProfileProps> = ({
  buttonName,
  formAction,
  userEmail,
  userName,
}) => {
  const router = useRouter();
  const [nameValue, setNameValue] = useState<string | undefined>(userName);
  const [emailValue, setEmailValue] = useState<string | undefined>(userEmail);

  const initialState = {
    message: null,
    errors: { name: undefined, email: undefined },
  };
  
  const [state, dispatch] = useFormState<FormState, FormData>(
    formAction,
    initialState
  );

  useEffect(() => {
    if (state.message === "edit") {
      toast.success("プロフィールを編集しました！");
      state.message = "";
      router.replace("/memorybook/");
    } else if (state.message === "failure") {
      toast.error("プロフィールの編集に失敗しました。");
    }
  }, [state.message]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  return (
    <>
      <h2 className="bg-itinerary-heading">プロフィール</h2>
      <div className="flex items-center justify-center">
        <div className="w-full border py-4 px-6 border-itinerary-borderGray rounded bg-white max-w-[620px]">
          <p className="text-center border-b pb-4 border-itinerary-borderGray font-semibold">
            プロフィール
          </p>
          <form action={dispatch} className="w-full py-3">
            <Form
              label="名前(ニックネーム)"
              name="name"
              placeholder="名前(ニックネーム)を記載してください。"
              value={nameValue}
              onChange={handleNameChange}
            />
            {state.errors && state.errors.name && (
              <p className="text-red-500">{state.errors.name}</p>
            )}
            <Form
              label="メールアドレス"
              name="email"
              placeholder="メールアドレスを記載してください。"
              value={emailValue}
              onChange={handleEmailChange}
            />
            {state.errors && state.errors.email && (
              <p className="text-red-500">{state.errors.email}</p>
            )}
            {state.errors && state.message !== "failure" && (
              <p className="text-red-500">{state.message}</p>
            )}
            <Button color="blue" size="normal" className="rounded mt-4">
              {buttonName}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormProfile;
