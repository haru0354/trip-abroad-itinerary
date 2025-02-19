"use client";

import { useCallback, useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import LoginModal from "../auth/LoginModal";
import SignupModal from "../auth/SignupModal";

type MenuProps = {
  currentUserId?: number | null;
};

const Menu: React.FC<MenuProps> = ({ currentUserId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [currentUserId]);

  return (
    <>
      {currentUserId ? (
        <>
          <div style={{ position: "relative" }}>
            <div onClick={toggleOpen}>
              <Image
                src="/user_logo01.png"
                alt="アバター"
                width={50}
                height={50}
              />
            </div>
            {isOpen && (
              <ul className="absolute right-0 mt-2 w-40 p-2 bg-white overflow-hidden shadow-lg z-10 text-base">
                <li className="cursor-pointer p-2 transition duration-300 hover:bg-itinerary-hoverBlue">
                  <Link href="/memorybook/dashboard">管理画面</Link>
                </li>
                <li
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="cursor-pointer p-2 transition duration-300 hover:bg-itinerary-hoverBlue"
                >
                  ログアウト
                </li>
              </ul>
            )}
          </div>
        </>
      ) : (
        <ul className="flex items-center justify-center">
          <li className="mx-2">
            <LoginModal />
          </li>
          <li className="mx-2">
            <SignupModal textButton={true} id="header-signup" />
          </li>
        </ul>
      )}
    </>
  );
};

export default Menu;
