"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const MenuItem = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/memorybook" });
    toggleOpen();
  };

  return (
    <div style={{ position: "relative" }}>
      <div onClick={toggleOpen} className="cursor-pointer">
        <Image src="/user_logo01.png" alt="アバター" width={50} height={50} />
      </div>
      {isOpen && (
        <ul className="absolute right-0 mt-2 w-40 p-2 bg-white overflow-hidden shadow-lg z-10 text-base">
          <li className="cursor-pointer p-2 transition duration-300 hover:bg-itinerary-hoverBlue">
            <Link href="/memorybook/dashboard">管理画面</Link>
          </li>
          <li
            onClick={handleLogout}
            className="cursor-pointer p-2 transition duration-300 hover:bg-itinerary-hoverBlue"
          >
            ログアウト
          </li>
        </ul>
      )}
    </div>
  );
};

export default MenuItem;
