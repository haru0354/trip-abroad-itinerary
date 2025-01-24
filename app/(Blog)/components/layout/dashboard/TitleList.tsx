type DashboardListProps = {
  titles: string[];
};

const TitleList: React.FC<DashboardListProps> = ({ titles }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto py-4 border border-blog-borderBlack">
      {titles.slice(0, titles.length - 1).map((title, index) => (
        <p
          key={index}
          className="sm:border-r border-blog-borderBlack w-full mb-0 px-2 sm:w-auto min-w-[140px]"
        >
          {title}
        </p>
      ))}
      {titles.length > 0 && (
        <p className="flex-wrap w-full border-blog-borderBlack mb-0 px-2 sm:w-auto min-w-[250px] max-w-[650px]">
          {titles[titles.length - 1]}
        </p>
      )}
    </div>
  );
};

export default TitleList;
