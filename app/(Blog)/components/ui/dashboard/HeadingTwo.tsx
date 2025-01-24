type HeadingTwoProps = {
  children: React.ReactNode;
};

const HeadingTwo: React.FC<HeadingTwoProps> = ({ children }) => {
  return (
    <h2 className="mb-12 p-5 text-xl font-bold rounded text-white bg-blog-dashboardHeading">
      {children}
    </h2>
  );
};

export default HeadingTwo;
