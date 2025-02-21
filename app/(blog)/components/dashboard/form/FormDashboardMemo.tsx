"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import FormContainer from "../../layout/dashboard/FormContainer";
import Input from "@/app/components/ui/form/Input";
import Button from "@/app/components/ui/button/Button";
import TextArea from "@/app/components/ui/form/TextArea";

import type { DashboardMemoFormType } from "@/app/(blog)/types/formTypes";
import type { DashboardFormState } from "@/app/(blog)/types/formState";
import type { DashboardMemo } from "@prisma/client";

type FormMemoProps = {
  dashboardMemo?: DashboardMemo | null;
  buttonName: string;
  formAction: (
    state: DashboardFormState,
    data: FormData
  ) => Promise<DashboardFormState>;
};

const FormDashboardMemo: React.FC<FormMemoProps> = ({
  dashboardMemo,
  buttonName,
  formAction,
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DashboardMemoFormType>({
    mode: "onBlur",
  });

  const initialState = { message: null, errors: { name: undefined } };
  const [state, dispatch] = useFormState<DashboardFormState, FormData>(
    formAction,
    initialState
  );

  const onSubmit: SubmitHandler<DashboardMemoFormType> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("content", data.content || "");

    try {
      dispatch(formData);
    } catch (error) {
      console.error("エラーが発生しました:", error);
      toast.error("エラーが発生しました。");
      state.message = "エラーが発生しました。もう一度お試しください。";
    }
  };

  useEffect(() => {
    if (state.message === "add") {
      state.message = "";
      toast.success("メモを保存しました！");
    } else if (state.message === "edit") {
      toast.success("メモを編集しました！");
      state.message = "";
      router.replace("/dashboard");
    }
  }, [state.message]);

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="メモの見出し"
            name="name"
            placeholder="メモの見出しを記載しましょう。"
            defaultValue={dashboardMemo?.name}
            register={register}
            required={true}
            error={errors.name?.message || state.errors?.name}
          />
          <TextArea
            label="メモする内容"
            name="content"
            placeholder="メモする内容を記載しましょう。"
            defaultValue={dashboardMemo?.content}
            register={register}
            error={errors.content?.message || state.errors?.content}
          />
          {state.message &&
            state.message !== "edit" &&
            state.message !== "add" && (
              <p className="text-red-500">{state.message}</p>
            )}
          <Button color="blue" size="normal" className="rounded mt-4">
            {buttonName}
          </Button>
        </form>
      </FormContainer>
    </>
  );
};

export default FormDashboardMemo;
