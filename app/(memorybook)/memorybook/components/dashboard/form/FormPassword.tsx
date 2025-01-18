"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/app/components/ui/Button";
import Form from "@/app/components/ui/Form";

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

  const [passwordValue, setPasswordValue] = useState<string | undefined>("");
  const [passwordConfirmationValue, setPasswordConfirmationValue] = useState<
    string | undefined
  >("");

  useEffect(() => {
    if (state.message === "edit") {
      toast.success("パスワードを編集しました！");
      state.message = "";
      router.replace("/memorybook/dashboard/profile");
    } else if (state.message === "failure") {
      toast.error("パスワードの編集に失敗しました。");
    }
  }, [state.message]);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const handlePasswordConfirmationChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirmationValue(e.target.value);
  };

  return (
    <>
      <h2>パスワードの変更</h2>
      <div className="flex items-center justify-center">
        <div className="w-full border py-4 px-6  border-gray-300 rounded bg-white max-w-[620px]">
          <p className="text-center border-b pb-4 border-gray-300 font-semibold">
            パスワード
          </p>
          <form action={dispatch} className="w-full py-3">
            <Form
              label="パスワード"
              name="password"
              type="password"
              placeholder="変更するパスワードを記載してください。"
              value={passwordValue}
              onChange={handlePasswordChange}
            />
            {state.errors && state.errors.password && (
              <p className="text-red-500">{state.errors.password}</p>
            )}
            <Form
              label="パスワード（確認用）"
              name="passwordConfirmation"
              type="password"
              placeholder="確認の為パスワードをもう一度記載してください。"
              value={passwordConfirmationValue}
              onChange={handlePasswordConfirmationChange}
            />
            {state.errors && state.errors.passwordConfirmation && (
              <p className="text-red-500">
                {state.errors.passwordConfirmation}
              </p>
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

export default FormPassword;
