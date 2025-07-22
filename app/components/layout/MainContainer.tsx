type MainContainerProps = {
  children: React.ReactNode;
};

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center max-w-[1150px] w-full h-full md:mt-8 md:mb-8 p-4 rounded bg-white">
      {children}
    </div>
  );
};

export default MainContainer;
