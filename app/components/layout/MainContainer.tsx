type MainContainerProps = {
  children: React.ReactNode;
  bgNone?: boolean;
  itineraryPage?: boolean;
};

const MainContainer: React.FC<MainContainerProps> = ({
  children,
  bgNone = false,
  itineraryPage = false,
}) => {
  const bgColor = bgNone ? "" : "bg-white";
  const marginTop = itineraryPage ? "md:mt-8" : "";

  return (
    <div
      className={`flex flex-col items-center justify-center max-w-[1150px] w-full h-full md:mb-8 p-4 rounded ${marginTop} ${bgColor}`}
    >
      {children}
    </div>
  );
};

export default MainContainer;
