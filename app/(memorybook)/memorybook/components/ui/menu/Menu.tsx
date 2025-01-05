"use client";

import { useCallback, useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import useLoginModal from "../../../hooks/useLoginModal";
import useSignupModal from "@/app/components/auth/hooks/useSignupModal";

type MenuProps = {
  currentUser: number | null;
};

const Menu: React.FC<MenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const loginModal = useLoginModal();
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
              <ul className="absolute right-0 mt-2 w-40 p-2 bg-white  overflow-hidden shadow-lg z-10 text-base ">
                <li className="cursor-pointer text-sky-700 hover:bg-gray-200 p-2">
                  <Link href="/memorybook/dashboard">管理画面</Link>
                </li>
                <li
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="cursor-pointer text-sky-700 hover:bg-gray-200 p-2"
                >
                  ログアウト
                </li>
              </ul>
            )}
          </div>
        </>
      ) : (
        <ul className="flex">
          <li className="ml-4">
            <p
              className="cursor-pointer mb-0"
              onClick={() => {
                loginModal.onOpen();
                setIsOpen(true);
              }}
            >
              ログイン
            </p>
          </li>
          <li className="ml-4">
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
