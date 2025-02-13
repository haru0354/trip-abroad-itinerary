type FormContainerProps = {
  children: React.ReactNode;
  maxWidth?: string;
};

const FormContainer: React.FC<FormContainerProps> = ({
  children,
  maxWidth = "max-w-full",
}) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`w-full py-4 px-6 border rounded border-blog-borderGray bg-white ${maxWidth}`}
      >
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
