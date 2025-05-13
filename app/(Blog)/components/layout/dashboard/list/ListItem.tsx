import ButtonNextLink from "@/app/components/ui/button/ButtonNextLink";

type ListItemProps = {
  items: Item[];
  editHref: string;
  pageHref?: string;
};

type Item = {
  name: string | null;
  limit: number;
};

const ListItem: React.FC<ListItemProps> = ({ items, editHref, pageHref }) => {
  return (
    <div className="flex justify-between flex-col sm:flex-row border-b border-blog-borderBlack w-full">
      <div className="flex flex-col sm:flex-row py-4 items-center w-full sm:w-auto">
        {items.map((item, index) => (
          <p
            key={index}
            className={` w-full mb-0 px-2 sm:w-auto ${
              index === items.length - 1
                ? "min-w-[300px]"
                : "min-w-[140px] sm:border-r border-blog-borderBlack"
            }`}
          >
            {item.name && item.name.length > item.limit
              ? `${item.name.slice(0, item.limit)}...`
              : item.name}
          </p>
        ))}
      </div>
      <div className="flex sm:justify-end items-center w-full sm:max-w-[240px] my-4 ">
        {pageHref && (
          <ButtonNextLink href={pageHref} size="small">
            ページ
          </ButtonNextLink>
        )}
        {editHref && (
          <ButtonNextLink href={editHref} color="gray" size="small">
            編集
          </ButtonNextLink>
        )}
      </div>
    </div>
  );
};

export default ListItem;
