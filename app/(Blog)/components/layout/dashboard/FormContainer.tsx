type FormContainerProps = {
  children: React.ReactNode;
};

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-full py-4 px-6 border rounded border-blog-borderGray bg-white">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
