"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture, faHouse } from "@fortawesome/free-solid-svg-icons";
import Button from "@/app/components/ui/button/Button";
import HamburgerMenu from "./side-menu/HamburgerMenu";

type DashboardSideMenuProps = {
  trips: Trips[] | undefined;
};

type Trips = {
  id: number;
  name: string;
};

const DashboardSideMenu: React.FC<DashboardSideMenuProps> = ({ trips }) => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/memorybook" });
  };

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
          <Button
            onClick={handleLogout}
            color="white"
            size="normal"
            className="rounded mt-4"
          >
            ログアウト
          </Button>
        </nav>
      </div>
      <HamburgerMenu trips={trips} handleLogout={handleLogout} />
    </>
  );
};

export default DashboardSideMenu;
