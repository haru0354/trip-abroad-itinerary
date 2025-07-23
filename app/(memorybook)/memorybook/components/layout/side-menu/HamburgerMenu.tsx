"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import LogoutButton from "../../ui/auth/LogoutButton";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";

import type { Trip } from "@prisma/client";
import Button from "@/app/components/ui/button/Button";

type HamburgerMenuProps = {
  trips: Trip[] | null;
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
        className="fixed sm:hidden top-2 right-2 flex flex-col items-center justify-center w-12 h-12 border rounded text-gray-700 bg-white border-itinerary-borderBlack z-10"
        onClick={toggleMenu}
      >
        <FontAwesomeIcon
          icon={isOpen ? faXmark : faBars}
          style={{ width: "18px", height: "22px" }}
        />
        <span className="text-xs text-center">MENU</span>
      </button>
      {isOpen && (
        <AnimatedItem
          className="fixed top-0 left-0 w-full h-screen bg-gray-500 px-8 py-12 overflow-y-auto"
          elementType="div"
          animation="fadeInRightVariants"
        >
          <p className="py-2 border-b text-white">ダッシュボード</p>
          <ul className="text-white">
            <Link href="/memorybook/dashboard/">
              <li
                className="py-2 px-4 transition duration-300 hover:bg-gray-300 hover:text-gray-900"
                onClick={toggleMenu}
              >
                ダッシュボード
              </li>
            </Link>
            <Link href="/memorybook/dashboard/profile">
              <li
                className="py-2 px-4 transition duration-300 hover:bg-gray-300 hover:text-gray-900"
                onClick={toggleMenu}
              >
                プロフィール
              </li>
            </Link>
            <Link href="/">
              <li className="py-2 px-4 transition duration-300 hover:bg-gray-300 hover:text-gray-900">
                旅の役立ちブログ「トラベルメモリー」
              </li>
            </Link>
          </ul>
          <p className="py-2 border-b mt-3 text-white">作成した旅行</p>
          {trips?.map((trip) => {
            return (
              <ul key={trip.id} className="text-white">
                <Link href={`/memorybook/${trip.id}/itinerary`}>
                  <li
                    key={trip.id}
                    className="py-2 px-4 transition duration-300 hover:bg-gray-300 hover:text-gray-900"
                  >
                    {trip.name}
                  </li>
                </Link>
              </ul>
            );
          })}
          <div className="my-10">
            <LogoutButton />
            <Button
              color="white"
              size="normal"
              className="mt-6 rounded"
              onClick={toggleMenu}
            >
              閉じる
            </Button>
          </div>
        </AnimatedItem>
      )}
    </>
  );
};

export default HamburgerMenu;
