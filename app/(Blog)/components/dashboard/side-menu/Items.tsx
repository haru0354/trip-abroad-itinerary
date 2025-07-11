import Link from "next/link";

type ItemsProps = {
  title: string;
  items: Items[];
};

type Items = {
  name: string;
  href: string;
};

const Items: React.FC<ItemsProps> = ({ title, items }) => {
  return (
    <ul className="text-white">
      <li className="py-2 border-b">{title}</li>
      {items.map((item, index) => (
        <Link href={item.href} key={index}>
          <li className="py-2 px-4 transition duration-300 hover:bg-gray-300 hover:text-gray-900">
            {item.name}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default Items;
