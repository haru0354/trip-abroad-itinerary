type DashboardListProps = {
  titles: string[];
};

const TitleList: React.FC<DashboardListProps> = ({ titles }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto py-4 border border-blog-borderBlack">
      {titles.slice(0, titles.length - 1).map((title, index) => (
        <p
          key={index}
          className="sm:border-r border-blog-borderBlack min-w-[140px] w-full sm:w-auto mb-0 px-2"
        >
          {title}
        </p>
      ))}
      {titles.length > 0 && (
        <p className="flex-wrap min-w-[250px] max-w-[650px] w-full sm:w-auto mb-0 px-2 border-blog-borderBlack">
          {titles[titles.length - 1]}
        </p>
      )}
    </div>
  );
};

export default TitleList;
