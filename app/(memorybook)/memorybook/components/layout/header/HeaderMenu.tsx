"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import LoginModal from "../../ui/auth/LoginModal";
import SignupModal from "../../ui/auth/SignupModal";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";

const HeaderMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/memorybook" });
    setIsOpen(false);
  };

  return (
    <>
      {session ? (
        <div className="relative">
          <div onClick={toggleOpen} className="cursor-pointer">
            <Image
              src="/user_logo01.png"
              alt="アバター"
              width={50}
              height={50}
            />
          </div>
          {isOpen && (
            <AnimatedItem elementType="div" animation="fadeInAndScaleVariants">
              <ul className="absolute right-0 w-40 mt-2 p-2 border shadow-lg bg-white z-10 cursor-pointer">
                <li className="p-2 transition duration-300 hover:bg-itinerary-hoverBlue">
                  <Link href="/memorybook/dashboard">管理画面</Link>
                </li>
                <li
                  onClick={handleLogout}
                  className="p-2 transition duration-300 hover:bg-itinerary-hoverBlue"
                >
                  ログアウト
                </li>
              </ul>
            </AnimatedItem>
          )}
        </div>
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

export default HeaderMenu;
