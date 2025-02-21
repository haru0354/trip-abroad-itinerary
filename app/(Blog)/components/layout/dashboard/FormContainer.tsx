import Button from "@/app/components/ui/button/Button";
import { FormEventHandler } from "react";

type FormContainerProps = {
  children: React.ReactNode;
  buttonName: string;
  maxWidth?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  action?: (
    data: FormData
  ) => Promise<{ message?: undefined } | { message: string }>;
};

const FormContainer: React.FC<FormContainerProps> = ({
  children,
  buttonName,
  maxWidth = "max-w-full",
  action,
  onSubmit,
}) => {
  const formProps = action ? { action } : onSubmit ? { onSubmit } : {};

  return (
    <div className="flex items-center justify-center">
      <div
        className={`w-full py-4 px-6 border rounded border-blog-borderGray bg-white ${maxWidth}`}
      >
        <form className="w-full py-3" {...formProps}>
          {children}
          <Button color="blue" size="normal" className="rounded mt-4">
            {buttonName}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormContainer;
