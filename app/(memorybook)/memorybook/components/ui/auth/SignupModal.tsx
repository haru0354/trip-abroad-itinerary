"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { useModal } from "@/app/hooks/useModal";
import { createUser } from "../../../action/actionProfile";
import Modal from "@/app/components/ui/modal/Modal";
import FormLayout from "../../layout/FormLayout";
import Input from "@/app/components/ui/form/Input";
import GoogleLoginButton from "./GoogleLoginButton";

import { createAccountSchema } from "../../../schema/userSchema";
import type { SignupFormState } from "../../../types/formState";
import type { UserFormType } from "../../../types/formType";

type SignupModalProps = {
  id: string;
  textButton?: boolean;
};

const SignupModal: React.FC<SignupModalProps> = ({
  textButton = false,
  id,
}) => {
  const router = useRouter();
  const { closeModal } = useModal();

  const {
    register,
    formState: { errors },
  } = useForm<UserFormType>({
    mode: "onBlur",
    resolver: zodResolver(createAccountSchema),
  });

  const initialState = {
    message: null,
    errors: {
      name: undefined,
      email: undefined,
      password: undefined,
    },
  };

  const [state, dispatch] = useFormState<SignupFormState, FormData>(
    createUser,
    initialState
  );

  useEffect(() => {
    const signInUser = async () => {
      if (state.message === "success") {
        try {
          const result = await signIn("itinerary", {
            email: state.user?.email,
            password: state.user?.password,
            redirect: false,
          });

          if (result?.error) {
            throw new Error(result.error);
          }

          toast.success("アカウントを作成しました。管理画面へ移動します。");
          closeModal(id);
          router.push("/memorybook/dashboard");
        } catch (error) {
          console.error("サインインエラー:", error);
          toast.error("ログインに失敗しました。");
        }
      }
    };

    signInUser();
  }, [state.message]);

  return (
    <Modal
      id={id}
      maxWidth="max-w-[400px]"
      buttonName="しおりを作成"
      textButton={textButton}
    >
      <FormLayout
        formTitle="アカウント作成"
        buttonName="アカウント作成"
        buttonSize="auth"
        action={dispatch}
        modalLayout={true}
      >
        <Input
          label="ニックネーム"
          name="name"
          placeholder="ニックネームを記載してください。"
          register={register}
          error={errors.name?.message || state.errors?.name}
        />
        <Input
          type="email"
          label="メールアドレス"
          name="email"
          placeholder="メールアドレスを記載してください。"
          register={register}
          error={errors.email?.message || state.errors?.email}
        />
        <Input
          type="password"
          label="パスワード"
          name="password"
          placeholder="パスワードを記載してください。"
          register={register}
          error={errors.password?.message || state.errors?.password}
        />
        {state.message && state.message !== "success" && (
          <p className="text-red-500">{state.message}</p>
        )}
      </FormLayout>
      <GoogleLoginButton closeModal={() => closeModal(id)} />
    </Modal>
  );
};

export default SignupModal;
