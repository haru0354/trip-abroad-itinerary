"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneDeparture,
  faHouse,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Button from "../ui/Button";

type DashboardItinerarySideMenuProps = {
  itineraryHomes: ItineraryHomes[];
};

type ItineraryHomes = {
  id: number;
  name: string;
};

const DashboardItinerarySideMenu: React.FC<DashboardItinerarySideMenuProps> = ({
  itineraryHomes,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/travel_brochure" });
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
              <Link href="/">
                <li className="flex py-3 px-2 text-white duration-300 hover:text-gray-900 hover:bg-gray-300 ">
                  <FontAwesomeIcon icon={faHouse} className="mr-2 w-5 mt-1" />
                  <p className="mx-2">ブログTOP</p>
                </li>
              </Link>
              <Link href="/travel_brochure/home/profile">
                <li className="flex py-3 px-2 text-white duration-300 hover:text-gray-900 hover:bg-gray-300 ">
                  <FontAwesomeIcon icon={faHouse} className="mr-2 w-5 mt-1" />
                  <p className="mx-2">プロフィール</p>
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
                    <Link
                      href={`/travel_brochure/${itineraryHome.id}/itinerary`}
                    >
                      <li className="flex py-3 px-2 text-white duration-300 hover:text-gray-900 hover:bg-gray-300 ">
                        <FontAwesomeIcon
                          icon={faPlaneDeparture}
                          className="mr-2 w-5 mt-1"
                        />
                        <p className="mx-2">{itineraryHome.name}</p>
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
          className="block sm:hidden text-white p-2 w-12 h-12 border rounded bg-gray-700 border-gray-800 fixed"
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
              className="block sm:hidden text-white p-2 w-12 h-12 border rounded bg-gray-700 border-gray-800 fixed z-10"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon
                icon={faXmark}
                style={{ width: "14px", height: "16px" }}
              />
            </button>
            <div
              className="fixed top-0 left-0 w-full h-screen bg-gray-500 px-10 pt-12"
              onClick={toggleMenu}
            >
              <p className="py-2 border-b text-white">ダッシュボード</p>
              <ul className="text-white">
                <Link href="/">
                  <li className="py-2 mx-4">ブログTOP</li>
                </Link>
                <Link href="/travel_brochure/home/profile">
                  <li className="py-2 mx-4">プロフィール</li>
                </Link>
              </ul>
              <p className="py-2 border-b mt-3 text-white">作成した旅行</p>
              {itineraryHomes.map((itineraryHome) => {
                return (
                  <ul key={itineraryHome.id} className="text-white">
                    <Link
                      href={`/travel_brochure/${itineraryHome.id}/itinerary`}
                    >
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

export default DashboardItinerarySideMenu;
