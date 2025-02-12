type FormLayoutProps = {
  children: React.ReactNode;
  maxWidth?: string;
};

const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  maxWidth = "max-w-[620px]",
}) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`w-full py-4 px-6 border rounded border-itinerary-borderGray  bg-white ${maxWidth} `}
      >
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
