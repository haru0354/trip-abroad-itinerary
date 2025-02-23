import Link from "next/link";

import Button from "@/app/components/ui/button/Button";

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
      <div className="flex sm:justify-end items-center my-4 sm:max-w-[240px]">
        {pageHref && (
          <Link href={pageHref}>
            <Button color="blue" size="small">
              ページ
            </Button>
          </Link>
        )}
        {editHref && (
          <Link href={editHref}>
            <Button color="gray" size="small">
              編集
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ListItem;
