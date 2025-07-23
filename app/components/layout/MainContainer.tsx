type MainContainerProps = {
  children: React.ReactNode;
  bgNone?: boolean;
};

const MainContainer: React.FC<MainContainerProps> = ({
  children,
  bgNone = false,
}) => {
  const bgColor = bgNone ? "" : "bg-white";
  return (
    <div
      className={`flex flex-col items-center justify-center max-w-[1150px] w-full h-full md:mt-8 md:mb-8 p-4 rounded ${bgColor}`}
    >
      {children}
    </div>
  );
};

export default MainContainer;
