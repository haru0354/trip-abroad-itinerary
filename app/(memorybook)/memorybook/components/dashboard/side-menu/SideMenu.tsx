"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneDeparture,
  faHouse,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/app/components/ui/Button";

type SideMenuProps = {
  itineraryHomes: ItineraryHomes[];
};

type ItineraryHomes = {
  id: number;
  name: string;
};

const SideMenu: React.FC<SideMenuProps> = ({ itineraryHomes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/memorybook" });
  };

  return (
    <>
      <div className="hidden sm:block fixed top-0 left-0 h-screen w-72 flex-col sm:flex-row sm:justify-around bg-gray-700">
        <nav className="px-6 mt-10 w-full">
          <div className="mb-6">
            <h3 className="w-full pb-2 mb-2 border-b-2 border-gray-300 text-white text-lg">
              ダッシュボード
            </h3>
            <ul>
              <Link href="/memorybook">
                <li className="flex py-2 px-2 text-white duration-300 hover:text-gray-900 hover:bg-gray-300 ">
                  <FontAwesomeIcon icon={faHouse} className="mr-2 w-5 mt-1" />
                  TOPページ
                </li>
              </Link>
              <Link href="/memorybook/home/">
                <li className="flex py-2 px-2 text-white duration-300 hover:text-gray-900 hover:bg-gray-300 ">
                  <FontAwesomeIcon icon={faHouse} className="mr-2 w-5 mt-1" />
                  ダッシュボード
                </li>
              </Link>
              <Link href="/memorybook/home/profile">
                <li className="flex py-2 px-2 text-white duration-300 hover:text-gray-900 hover:bg-gray-300 ">
                  <FontAwesomeIcon icon={faHouse} className="mr-2 w-5 mt-1" />
                  プロフィール
                </li>
              </Link>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="w-full pb-2 mb-2 border-b-2 border-gray-300 text-white text-lg">
              作成した旅行
            </h3>
            <ul>
              {itineraryHomes.map((itineraryHome) => {
                return (
                  <div key={itineraryHome.id}>
                    <Link href={`/memorybook/${itineraryHome.id}/itinerary`}>
                      <li className="flex py-2 px-2 text-white duration-300 hover:text-gray-900 hover:bg-gray-300 ">
                        <FontAwesomeIcon
                          icon={faPlaneDeparture}
                          className="mr-2 w-5 mt-1"
                        />
                        {itineraryHome.name}
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
      {/* ハンバーガーメニュー */}
      <div>
        <button
          className="fixed top-0 left-0 block sm:hidden text-white p-2 w-12 h-12 ml-[2px] border rounded bg-gray-700 border-gray-800 z-10"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon
            icon={faBars}
            style={{ width: "14px", height: "16px" }}
          />
        </button>
        {isOpen && (
          <>
            <button
              className="fixed top-0 left-0 block sm:hidden text-white p-2 w-12 h-12 ml-[2px] border rounded bg-gray-700 border-gray-800 z-10"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon
                icon={faXmark}
                style={{ width: "14px", height: "16px" }}
              />
            </button>
            <div className="fixed top-0 left-0 w-full h-screen bg-gray-500 px-10 pt-12">
              <p className="py-2 border-b text-white">ダッシュボード</p>
              <ul className="text-white">
                <Link href="/memorybook">
                  <li className="py-2 mx-4">TOPページ</li>
                </Link>
                <Link href="/memorybook/home/">
                  <li className="py-2 mx-4" onClick={toggleMenu}>
                    ダッシュボード
                  </li>
                </Link>
                <Link href="/memorybook/home/profile">
                  <li className="py-2 mx-4" onClick={toggleMenu}>
                    プロフィール
                  </li>
                </Link>
              </ul>
              <p className="py-2 border-b mt-3 text-white">作成した旅行</p>
              {itineraryHomes.map((itineraryHome) => {
                return (
                  <ul key={itineraryHome.id} className="text-white">
                    <Link href={`/memorybook/${itineraryHome.id}/itinerary`}>
                      <li key={itineraryHome.id} className="py-2 mx-4">
                        {itineraryHome.name}
                      </li>
                    </Link>
                  </ul>
                );
              })}
              <Button
                onClick={handleLogout}
                color="white"
                size="normal"
                className="rounded mt-4"
              >
                ログアウト
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideMenu;
