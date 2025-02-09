"use client";

import { useCallback, useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import useSignupModal from "../../../hooks/useSignupModal";
import LoginModal from "../auth/LoginModal";

type MenuProps = {
  currentUser: number | null;
};

const Menu: React.FC<MenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const signupModal = useSignupModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [currentUser]);

  return (
    <>
      {currentUser ? (
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
            <p
              className="cursor-pointer mb-0"
              onClick={() => {
                signupModal.onOpen();
                setIsOpen(true);
              }}
            >
              登録
            </p>
          </li>
        </ul>
      )}
    </>
  );
};

export default Menu;
