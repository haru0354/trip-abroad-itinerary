"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import FormLayout from "../../layout/FormLayout";
import Input from "@/app/components/ui/form/Input";

import { profileSchema } from "../../../schema/userSchema";
import type { ProfileFormState } from "@/app/(memorybook)/memorybook/types/formState";
import type { ProfileFormType } from "@/app/(memorybook)/memorybook/types/formType";

type FormProfileProps = {
  buttonName: string;
  formAction: (
    state: ProfileFormState,
    data: FormData
  ) => Promise<ProfileFormState>;
  userEmail: string | undefined;
  userName: string | undefined;
};

const FormProfile: React.FC<FormProfileProps> = ({
  buttonName,
  formAction,
}) => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
  } = useForm<ProfileFormType>({
    mode: "onBlur",
    resolver: zodResolver(profileSchema),
  });

  const initialState = {
    message: null,
    errors: { name: undefined, email: undefined },
  };

  const [state, dispatch] = useFormState<ProfileFormState, FormData>(
    formAction,
    initialState
  );

  useEffect(() => {
    if (state.message === "edit") {
      toast.success("プロフィールを編集しました！");
      state.message = "";
      router.replace("/memorybook/");
    }
  }, [state.message]);

  return (
    <>
      <h2 className="bg-itinerary-heading">プロフィール</h2>
      <FormLayout
        formTitle="プロフィールのフォーム"
        buttonName={buttonName}
        action={dispatch}
      >
        <Input
          name="name"
          label="名前(ニックネーム)"
          placeholder="名前(ニックネーム)を記載してください。"
          register={register}
          error={errors.name?.message || state.errors?.name}
        />
        <Input
          type="email"
          name="email"
          label="メールアドレス"
          placeholder="メールアドレスを記載してください。"
          register={register}
          error={errors.email?.message || state.errors?.email}
        />
        {state.message && state.message !== "edit" && (
          <p className="text-red-500">{state.message}</p>
        )}
      </FormLayout>
    </>
  );
};

export default FormProfile;
