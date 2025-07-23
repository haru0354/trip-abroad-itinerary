"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import FormContainer from "./layout/dashboard/FormContainer";
import Input from "@/app/components/ui/form/Input";

import type { LoginFormType } from "../types/formTypes";

const AdminForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      const result = await signIn("blog", {
        redirect: false,
        id: data.id,
        password: data.password,
      });

      if (!result?.error) {
        toast.success("ログインしました！");
        router.replace(`/dashboard/`);
      } else {
        setErrorMessage(result.error);
      }
    } catch (error) {
      console.error("ログイン中にエラーが発生しました:", error);
      setErrorMessage("ログイン中にエラーが発生しました");
      toast.error("ログイン中にエラーが発生しました。" + error);
    }
  };

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      maxWidth="max-w-[400px]"
      buttonName="ログイン"
    >
      <h2 className="py-2 my-1 text-center text-base font-semibold border-b text-blog-black bg-white border-blog-borderGray">
        ログインフォーム
      </h2>
      <Input
        label="ID"
        name="id"
        placeholder="ID"
        register={register}
        required={true}
        error={errors.id?.message}
      />
      <Input
        label="パスワード"
        type="password"
        name="password"
        placeholder="パスワード"
        register={register}
        required={true}
        error={errors.password?.message}
      />
      {errorMessage && <p className="text-red-500 pt-4">{errorMessage}</p>}
    </FormContainer>
  );
};

export default AdminForm;
