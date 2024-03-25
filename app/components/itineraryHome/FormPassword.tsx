"use client";

import { useState, ChangeEvent } from "react";
import Button from "../ui/Button";
import Form from "../ui/Form";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

type FormPasswordProps = {
  buttonName: string;
  formAction: (state: FormState, data: FormData) => Promise<FormState>;
};

type FormState = {
  message?: string | null;
  errors?: {
    password?: string[] | undefined;
    passwordConfirmation?: string[] | undefined;
  };
};

const FormPassword: React.FC<FormPasswordProps> = ({
  buttonName,
  formAction,
}) => {
  const router = useRouter();

  const initialState = {
    message: null,
    errors: { password: undefined, passwordConfirmation: undefined },
  };
  const [state, dispatch] = useFormState<FormState, FormData>(
    formAction,
    initialState
  );
  const [errorMessage, setErrorMessage] = useState<FormState>();
  const [passwordValue, setPasswordValue] = useState<string | undefined>("");
  const [passwordConfirmationValue, setPasswordConfirmationValue] = useState<string | undefined>("");

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const handlePasswordConfirmationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmationValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await formAction(state, formData);
    switch (result.message) {
      case "edit":
        toast.success("パスワードを編集しました！");
        router.replace("/memorybook/home/profile");
        break;
      default:
        setErrorMessage(result);
        break;
    }
  };

  return (
    <>
      <h2>パスワードの変更</h2>
      <div className="flex items-center justify-center">
        <div className="w-full border py-4 px-6  border-gray-300 rounded bg-white max-w-[620px]">
          <p className="text-center border-b pb-4 border-gray-300 text-gray-600 font-semibold">
            パスワード
          </p>
          <form onSubmit={handleSubmit} className="w-full py-3">
            <Form
              label="パスワード"
              name="password"
              type="password"
              placeholder="パスワードを記載しましょう。"
              value={passwordValue}
              onChange={handlePasswordChange}
            />
            {errorMessage &&
              errorMessage.errors &&
              errorMessage.errors.password && (
                <p className="text-red-500">{errorMessage.errors.password}</p>
              )}
            <Form
              label="パスワード（確認用）"
              name="confirmPassword"
              type="password"
              placeholder="確認の為パスワードをもう一度記載しましょう。"
              value={passwordConfirmationValue}
              onChange={handlePasswordConfirmationChange}
            />
            {errorMessage &&
              errorMessage.errors &&
              errorMessage.errors.passwordConfirmation && (
                <p className="text-red-500">{errorMessage.errors.passwordConfirmation}</p>
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

export default FormPassword;
