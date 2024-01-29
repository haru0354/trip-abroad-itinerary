import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faPenToSquare,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const FooterMenu = () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-300 dark:bg-gray-700 dark:border-gray-600">
      <div className="flex h-full max-w-lg justify-center items-center mx-auto ">
        <Link href="./">
          <button className="inline-flex flex-col items-center justify-center px-10 border-gray-300 border-r hover:bg-gray-200 hover:py-4">
            <FontAwesomeIcon icon={faHouse} />
            <span className="items-center text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              ホーム
            </span>
          </button>
        </Link>
        <Link href="../itinerary">
          <button className="inline-flex flex-col items-center justify-center px-10 border-gray-300 border-r hover:bg-gray-200 hover:py-4">
            <FontAwesomeIcon icon={faPlane} />
            <span className="items-center text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              旅程表
            </span>
          </button>
        </Link>
        <Link href="../memo">
          <button className="inline-flex flex-col items-center justify-center px-10 border-gray-300 hover:bg-gray-200 hover:py-4">
            <FontAwesomeIcon icon={faPenToSquare} />
            <span className="items-center text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              メモ帳
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FooterMenu;
