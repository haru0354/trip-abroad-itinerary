import React from "react";

type ListItemProps = {
  items: Item[];
};

type Item = {
  name: string | null;
  limit: number;
};

const ListItem: React.FC<ListItemProps> = ({ items }) => {
  return (
    <div className="flex flex-col sm:flex-row py-4 items-center w-full sm:w-auto">
      {items.map((item, index) => (
        <p
          key={item.name}
          className={` w-full mb-0 px-2 sm:w-auto ${
            index === items.length - 1
              ? "min-w-[650px]"
              : "min-w-[140px] sm:border-r border-blog-borderBlack"
          }`}
        >
          {item.name && item.name.length > item.limit
            ? `${item.name.slice(0, item.limit)}...`
            : item.name}
        </p>
      ))}
    </div>
  );
};

export default ListItem;
