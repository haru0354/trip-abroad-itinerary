type SideMenuContainerProps = {
  children: React.ReactNode;
  title: string;
  addClass?: string;
};

const SideMenuContainer: React.FC<SideMenuContainerProps> = ({
  children,
  title,
  addClass,
}) => {
  return (
    <div className={`w-full p-2 ${addClass}`}>
      <h3 className="px-2 py-4 font-bold text-lg rounded bg-blog-heading text-white">
        {title}
      </h3>
      {children}
    </div>
  );
};

export default SideMenuContainer;
