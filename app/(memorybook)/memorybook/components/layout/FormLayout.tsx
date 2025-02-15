import { FormEventHandler } from "react";
import Button from "@/app/components/ui/button/Button";

type FormLayoutProps = {
  formTitle: string;
  buttonName: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  maxWidth?: string;
  children: React.ReactNode;
};

const FormLayout: React.FC<FormLayoutProps> = ({
  formTitle,
  buttonName,
  onSubmit,
  maxWidth = "max-w-[620px]",
  children,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`w-full py-4 px-6 border rounded border-itinerary-borderGray  bg-white ${maxWidth} `}
      >
        <p className="text-center border-b pb-4 border-itinerary-borderGray font-semibold">
          {formTitle}
        </p>
        <form onSubmit={onSubmit} className="w-full py-3">
          {children}
          <Button color="blue" size="normal" className="rounded mt-4">
            {buttonName}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormLayout;
