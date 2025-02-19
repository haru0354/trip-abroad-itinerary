"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

import FormLayout from "../../layout/FormLayout";
import Input from "@/app/components/ui/form/Input";

import type { ChangeEmailState } from "@/app/(memorybook)/memorybook/types/formState";
import type { ChangeEmailFormType } from "@/app/(memorybook)/memorybook/types/formType";

type FormProfileProps = {
  buttonName: string;
  formAction: (
    state: ChangeEmailState,
    data: FormData
  ) => Promise<ChangeEmailState>;
  userEmail: string | undefined;
  userName: string | undefined;
};

const FormEmail: React.FC<FormProfileProps> = ({ buttonName, formAction }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeEmailFormType>({
    mode: "onBlur",
  });

  const initialState = {
    message: null,
    errors: { name: undefined, email: undefined },
  };

  const [state, dispatch] = useFormState<ChangeEmailState, FormData>(
    formAction,
    initialState
  );

  const onSubmit: SubmitHandler<ChangeEmailFormType> = (data) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("emailConfirmation", data.emailConfirmation);
      formData.append("password", data.password);
      dispatch(formData);
    } catch (error) {
      console.error("メールアドレスが変更中にエラーが発生しました:", error);
      toast.error("メールアドレスが変更中にエラーが発生しました。" + error);
    }
  };

  useEffect(() => {
    if (state.message === "success") {
      toast.success("メールアドレスが変更しました！ログアウトが実行されます。");
      state.message = "";
      signOut({ callbackUrl: "/memorybook" });
    }
  }, [state.message]);

  return (
    <>
      <FormLayout
        formTitle="メールアドレスのフォーム"
        buttonName={buttonName}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="email"
          name="email"
          label="メールアドレス"
          placeholder="変更したいメールアドレスを記載してください。"
          register={register}
          required={true}
          pattern="email"
          error={errors.email?.message || state.errors?.email}
        />
        <Input
          type="email"
          name="emailConfirmation"
          label="メールアドレス（確認用）"
          placeholder="確認の為メールアドレスをもう一度記載してください。"
          register={register}
          required={true}
          pattern="email"
          error={
            errors.emailConfirmation?.message || state.errors?.emailConfirmation
          }
        />
        <Input
          label="パスワード"
          name="password"
          type="password"
          placeholder="登録しているパスワードを記載してください。"
          register={register}
          required={true}
          minLength={6}
          error={errors.password?.message || state.errors?.password}
        />
        {state.message && state.message !== "edit" && (
          <p className="text-red-500">{state.message}</p>
        )}
      </FormLayout>
    </>
  );
};

export default FormEmail;
