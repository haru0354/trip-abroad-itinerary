"use client";
import Image from "next/image";
import { User } from "@prisma/client";
import { useCallback, useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import useLoginModal from "../hooks/useLoginModal";
import useSignupModal from "../hooks/useSignupModal";
import useProfileModal from "../hooks/useProfile";
import { signOut } from "next-auth/react";
import Button from "../../ui/Button";

type MenuProps = {
  currentUser: User | null;
};

const Menu: React.FC<MenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const loginModal = useLoginModal();
  const signupModal = useSignupModal();
  const profileModal = useProfileModal();

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
          <div onClick={toggleOpen}>
            <Image src={"/default.png"} alt="avatar" width={50} height={50} />
          </div>
          {isOpen && (
            <ul className="absolute right-0 mt-36 w-40 p-2 bg-white rounded-md overflow-hidden shadow-lg z-10 text-base ">
              <li className="pb-2">
                <p
                  onClick={() => {
                    profileModal.onOpen();
                    setIsOpen(false);
                  }}
                >
                  プロフィール
                </p>
              </li>
              <li>
                <p
                  className="cursor-pointer"
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                >
                  ログアウト
                </p>
              </li>
            </ul>
          )}
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
