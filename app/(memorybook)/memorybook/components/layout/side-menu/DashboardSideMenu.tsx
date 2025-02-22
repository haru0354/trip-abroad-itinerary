import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture, faHouse } from "@fortawesome/free-solid-svg-icons";

import HamburgerMenu from "./HamburgerMenu";
import LogoutButton from "../../ui/auth/LogoutButton";

import type { Trip } from "@prisma/client";

type DashboardSideMenuProps = {
  trips: Trip[] | undefined;
};

const DashboardSideMenu: React.FC<DashboardSideMenuProps> = ({ trips }) => {
  return (
    <>
      <div className="hidden sm:block fixed top-0 left-0 h-screen w-72 flex-col sm:flex-row sm:justify-around bg-gray-700">
        <nav className="px-6 mt-10 w-full">
          <div className="mb-6">
            <h3 className="w-full pb-2 mb-2 border-b-2 border-itinerary-borderGray text-white text-lg">
              ダッシュボード
            </h3>
            <ul>
              <Link href="/memorybook">
                <li className="flex py-2 px-2 text-white transition duration-300 hover:text-itinerary-black hover:bg-gray-300 ">
                  <FontAwesomeIcon icon={faHouse} className="mr-2 w-5 mt-1" />
                  TOPページ
                </li>
              </Link>
              <Link href="/memorybook/dashboard/">
                <li className="flex py-2 px-2 text-white transition duration-300 hover:text-itinerary-black hover:bg-gray-300 ">
                  <FontAwesomeIcon icon={faHouse} className="mr-2 w-5 mt-1" />
                  ダッシュボード
                </li>
              </Link>
              <Link href="/memorybook/dashboard/profile">
                <li className="flex py-2 px-2 text-white transition duration-300 hover:text-itinerary-black hover:bg-gray-300 ">
                  <FontAwesomeIcon icon={faHouse} className="mr-2 w-5 mt-1" />
                  プロフィール
                </li>
              </Link>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="w-full pb-2 mb-2 border-b-2 border-itinerary-borderGray text-white text-lg">
              作成した旅行
            </h3>
            <ul>
              {trips?.map((trip) => {
                return (
                  <div key={trip.id}>
                    <Link href={`/memorybook/${trip.id}/itinerary`}>
                      <li className="flex py-2 px-2 text-white  transition duration-300 hover:text-itinerary-black hover:bg-gray-300 ">
                        <FontAwesomeIcon
                          icon={faPlaneDeparture}
                          className="mr-2 w-5 mt-1"
                        />
                        {trip.name}
                      </li>
                    </Link>
                  </div>
                );
              })}
            </ul>
          </div>
          <LogoutButton />
        </nav>
      </div>
      <HamburgerMenu trips={trips} />
    </>
  );
};

export default DashboardSideMenu;
