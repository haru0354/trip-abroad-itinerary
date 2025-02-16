"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import LogoutButton from "../../ui/auth/LogoutButton";

type HamburgerMenuProps = {
  trips: Trips[] | undefined;
};

type Trips = {
  id: number;
  name: string;
};

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ trips }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      <button
        className="fixed top-0 left-0 block sm:hidden text-white p-2 w-12 h-12 ml-[2px] border rounded bg-gray-700 border-itinerary-borderBlack z-10"
        onClick={toggleMenu}
      >
        <FontAwesomeIcon
          icon={isOpen ? faXmark : faBars}
          style={{ width: "14px", height: "16px" }}
        />
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-gray-500 px-10 pt-12 overflow-y-auto">
          <p className="py-2 border-b text-white">ダッシュボード</p>
          <ul className="text-white">
            <Link href="/memorybook">
              <li className="py-2 mx-4">TOPページ</li>
            </Link>
            <Link href="/memorybook/dashboard/">
              <li className="py-2 mx-4" onClick={toggleMenu}>
                ダッシュボード
              </li>
            </Link>
            <Link href="/memorybook/dashboard/profile">
              <li className="py-2 mx-4" onClick={toggleMenu}>
                プロフィール
              </li>
            </Link>
          </ul>
          <p className="py-2 border-b mt-3 text-white">作成した旅行</p>
          {trips?.map((trip) => {
            return (
              <ul key={trip.id} className="text-white">
                <Link href={`/memorybook/${trip.id}/itinerary`}>
                  <li key={trip.id} className="py-2 mx-4">
                    {trip.name}
                  </li>
                </Link>
              </ul>
            );
          })}
          <LogoutButton />
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
