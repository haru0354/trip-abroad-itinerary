import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type MenuProps = {
  title: string;
  lists: List[];
};

type List = {
  href: string;
  name: string;
  icon: IconDefinition;
};

const MenuBox: React.FC<MenuProps> = ({ title, lists }) => {
  return (
    <div className="my-6">
      <h3 className="w-full pb-2 mb-2 border-b-2 border-blog-borderGray text-white text-lg">
        {title}
      </h3>
      <ul>
        {lists.map((list) => (
          <Link href={list.href} key={list.name}>
            <li className="flex py-3 px-2 text-white transition duration-300 hover:text-gray-900 hover:bg-gray-300 ">
              <FontAwesomeIcon icon={list.icon} className="mr-2 w-5 h-4 mt-1" />
              {list.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MenuBox;
