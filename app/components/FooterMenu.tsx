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
    <div className="fixed z-50 bottom-0 w-full h-16  bg-white border-t border-gray-300 shadow">
      <div className="max-w-lg flex h-full  justify-center items-center mx-auto ">
        <div className="w-full h-full">
        <Link href="../">
          <button className="btn-footer">
            <FontAwesomeIcon icon={faHouse} />
            <span className=" text-gray-500">ホーム</span>
          </button>
        </Link>
        </div>
        <div className="w-full h-full">
        <Link href="../itinerary">
        <button className="btn-footer">
            <FontAwesomeIcon icon={faPlane} />
            <span className=" text-gray-500">旅程表</span>
          </button>
        </Link>
        </div>
        <div className="w-full h-full">
        <Link href="../memo">
        <button className="btn-footer">
            <FontAwesomeIcon icon={faPenToSquare} />
            <span className=" text-gray-500">メモ帳</span>
          </button>
        </Link>
        </div>
        <div className="w-full h-full">
        <Link href="#">
          <button className="btn-footer">
            <FontAwesomeIcon icon={faCircleUp} />
            <span className=" text-gray-500">追加</span>
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterMenu;
