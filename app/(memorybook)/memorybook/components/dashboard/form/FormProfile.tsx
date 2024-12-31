"use client";

import { useState, ChangeEvent } from "react";
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

  const initialState = {
    message: null,
    errors: { name: undefined, email: undefined },
  };
  const [state, dispatch] = useFormState<FormState, FormData>(
    formAction,
    initialState
  );
  const [errorMessage, setErrorMessage] = useState<FormState>();
  const [nameValue, setNameValue] = useState<string | undefined>(userName);
  const [emailValue, setEmailValue] = useState<string | undefined>(userEmail);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await formAction(state, formData);
    switch (result.message) {
      case "edit":
        toast.success("プロフィールを編集しました！");
        router.replace("/memorybook/");
        break;
      default:
        setErrorMessage(result);
        break;
    }
  };

  return (
    <>
      <h2>プロフィール</h2>
      <div className="flex items-center justify-center">
        <div className="w-full border py-4 px-6  border-gray-300 rounded bg-white max-w-[620px]">
          <p className="text-center border-b pb-4 border-gray-300 text-gray-600 font-semibold">
            プロフィール
          </p>
          <form onSubmit={handleSubmit} className="w-full py-3">
            <Form
              label="名前(ニックネーム)"
              name="name"
              placeholder="名前(ニックネーム)を記載してください。"
              value={nameValue}
              onChange={handleNameChange}
            />
            {errorMessage &&
              errorMessage.errors &&
              errorMessage.errors.name && (
                <p className="text-red-500">{errorMessage.errors.name}</p>
              )}
            <Form
              label="メールアドレス"
              name="email"
              placeholder="メールアドレスを記載してください。"
              value={emailValue}
              onChange={handleEmailChange}
            />
            {errorMessage &&
              errorMessage.errors &&
              errorMessage.errors.email && (
                <p className="text-red-500">{errorMessage.errors.email}</p>
              )}
            {errorMessage && errorMessage.message !== "failure" && (
              <p className="text-red-500">{errorMessage.message}</p>
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
