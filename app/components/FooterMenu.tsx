import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faPenToSquare,
  faHouse,
  faCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Button from "./ui/Button";

type FooterMenuProps = {
  itineraryHomeId: number;
};

const FooterMenu: React.FC<FooterMenuProps> = ({ itineraryHomeId }) => {
  return (
    <div className="fixed z-50 bottom-0 w-full h-16  bg-white border-t border-gray-300 shadow">
      <div className="max-w-lg flex h-full  justify-center items-center mx-auto ">
        <div className="w-full h-full">
          <Link href="/travel_brochure/home">
            <Button className="btn-footer">
              <FontAwesomeIcon icon={faHouse} />
              <span className="text-gray-500">ホーム</span>
            </Button>
          </Link>
        </div>
        <div className="w-full h-full">
          <Link href={`/travel_brochure/${itineraryHomeId}/itinerary`}>
            <Button className="btn-footer">
              <FontAwesomeIcon icon={faPlane} />
              <span className="text-gray-500">旅程表</span>
            </Button>
          </Link>
        </div>
        <div className="w-full h-full">
          <Link href={`/travel_brochure/${itineraryHomeId}/memo`}>
            <Button className="btn-footer">
              <FontAwesomeIcon icon={faPenToSquare} />
              <span className="text-gray-500">メモ帳</span>
            </Button>
          </Link>
        </div>
        <div className="w-full h-full">
          <Link href="#">
            <Button className="btn-footer">
              <FontAwesomeIcon icon={faCircleUp} />
              <span className="text-gray-500">追加</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterMenu;
