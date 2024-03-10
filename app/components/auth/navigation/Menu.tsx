"use client";
import Image from "next/image";
import { User } from "@prisma/client";
import { useCallback, useState, useEffect } from "react";
import useLoginModal from "../hooks/useLoginModal";
import useSignupModal from "../hooks/useSignupModal";
import { signOut } from "next-auth/react";
import Link from "next/link";

type MenuProps = {
  currentUser: User | null;
};

const Menu: React.FC<MenuProps> = ({ currentUser }) => {
  const userId = currentUser?.id;

  const [isOpen, setIsOpen] = useState(false);
  const loginModal = useLoginModal();
  const signupModal = useSignupModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  useEffect(() => {
    setIsOpen(false); // isOpenをfalseに設定して再レンダリングをトリガーする
  }, [currentUser]); // currentUserが変更された時に再レンダリングする

  return (
    <>
      {currentUser ? (
        <>
          <div style={{ position: "relative" }}>
            <div onClick={toggleOpen}>
              <Image
                src={"/user_logo01.png"}
                alt="avatar"
                width={50}
                height={50}
              />
            </div>
            {isOpen && (
              <ul className="absolute right-0 mt-2 w-40 p-2 bg-white  overflow-hidden shadow-lg z-10 text-base ">
                <li className="cursor-pointer text-sky-700 hover:bg-gray-200 p-2">
                  <Link href="/travel_brochure/home">管理画面</Link>
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
              className="cursor-pointer"
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
              className="cursor-pointer "
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
