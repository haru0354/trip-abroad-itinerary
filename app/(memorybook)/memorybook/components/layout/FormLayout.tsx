import { FormEventHandler } from "react";

import Button from "@/app/components/ui/button/Button";

type FormLayoutProps = {
  formTitle: string;
  buttonName: string;
  maxWidth?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  action?: (
    data: FormData
  ) => Promise<{ message?: undefined } | { message: string }>;
  modalLayout?: boolean;
  buttonSize?: "normal" | "auth";
  children: React.ReactNode;
};

const FormLayout: React.FC<FormLayoutProps> = ({
  formTitle,
  buttonName,
  onSubmit,
  action,
  maxWidth = "max-w-[620px]",
  modalLayout = false,
  buttonSize = "normal",
  children,
}) => {
  const formProps = action ? { action } : onSubmit ? { onSubmit } : {};

  return (
    <>
      {modalLayout ? (
        <>
          <p className="text-center border-b pb-4 border-itinerary-borderGray font-semibold">
            {formTitle}
          </p>
          <form className="w-full py-3" {...formProps}>
            {children}
            <Button color="blue" size={buttonSize} className="rounded mt-4">
              {buttonName}
            </Button>
          </form>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <div
            className={`w-full py-4 px-6 border rounded border-itinerary-borderGray  bg-white ${maxWidth} `}
          >
            <p className="text-center border-b pb-4 border-itinerary-borderGray font-semibold">
              {formTitle}
            </p>
            <form className="w-full py-3" {...formProps}>
              {children}
              <Button color="blue" size={buttonSize} type="submit" className="rounded mt-4">
                {buttonName}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FormLayout;
