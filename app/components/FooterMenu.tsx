import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faPenToSquare,
  faHouse,
  faCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const FooterMenu = () => {
  return (
    <div className="fixed bottom-0 z-50 w-full h-16 bg-white border-t border-gray-400 dark:bg-gray-700 dark:border-gray-600">
      <div className="max-w-lg flex h-full  justify-center items-center mx-auto ">
        <div className="w-full h-full">
        <Link href="../">
          <button className="w-full h-full flex-1 inline-flex flex-col items-center justify-center hover:bg-gray-200 border-gray-400 border-r">
            <FontAwesomeIcon icon={faHouse} />
            <span className=" text-gray-500">ホーム</span>
          </button>
        </Link>
        </div>
        <div className="w-full h-full">
        <Link href="../itinerary">
        <button className="w-full h-full flex-1 inline-flex flex-col items-center justify-center hover:bg-gray-200 border-gray-400 border-r">
            <FontAwesomeIcon icon={faPlane} />
            <span className=" text-gray-500">旅程表</span>
          </button>
        </Link>
        </div>
        <div className="w-full h-full">
        <Link href="../memo">
        <button className="w-full h-full flex-1 inline-flex flex-col items-center justify-center hover:bg-gray-200 border-gray-400 border-r">
            <FontAwesomeIcon icon={faPenToSquare} />
            <span className=" text-gray-500">メモ帳</span>
          </button>
        </Link>
        </div>
        <div className="w-full h-full">
        <Link href="#">
          <button className="w-full h-full flex-1 inline-flex flex-col items-center justify-center hover:bg-gray-200">
            <FontAwesomeIcon icon={faCircleUp} />
            <span className=" text-gray-500">TOP</span>
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterMenu;
