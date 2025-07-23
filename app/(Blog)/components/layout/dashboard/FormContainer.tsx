import { FormEventHandler } from "react";

import Button from "@/app/components/ui/button/Button";

type FormContainerProps = {
  children: React.ReactNode;
  buttonName: string;
  maxWidth?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  action?: string | ((formData: FormData) => void | Promise<void>);
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
          <Button
            color="blue"
            size="normal"
            type="submit"
            className="rounded mt-4"
          >
            {buttonName}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormContainer;
