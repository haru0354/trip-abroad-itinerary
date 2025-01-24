"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faPen,
  faImage,
  faHouse,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Button from "@/app/components/ui/Button";
import MenuBox from "../ui/MenuBox";

const DashboardSideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin" });
  };

  return (
    <>
      <div className="hidden sm:block fixed top-0 left-0 h-screen w-72 flex-col sm:flex-row sm:justify-around bg-blog-black overflow-y-auto">
        <nav className="px-6 mt-10 w-full">
          <MenuBox
            title="ダッシュボード"
            lists={[
              {
                href: "/",
                name: "ブログTOP",
                icon: faHouse,
              },
              {
                href: "/dashboard",
                name: "サイト制作のメモ",
                icon: faHouse,
              },
            ]}
          />
          <MenuBox
            title="記事"
            lists={[
              {
                href: "/dashboard/post",
                name: "記事一覧",
                icon: faPen,
              },
              {
                href: "/dashboard/post/new-post",
                name: "新規記事",
                icon: faPen,
              },
            ]}
          />
          <MenuBox
            title="カテゴリ"
            lists={[
              {
                href: "/dashboard/category",
                name: "カテゴリ一覧",
                icon: faList,
              },
              {
                href: "/dashboard/category/new-category",
                name: "新規カテゴリ",
                icon: faList,
              },
            ]}
          />
          <MenuBox
            title="画像"
            lists={[
              {
                href: "/dashboard/image",
                name: "画像一覧",
                icon: faImage,
              },
              {
                href: "/dashboard/image/new-image",
                name: "新規画像",
                icon: faImage,
              },
            ]}
          />
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
          className="block sm:hidden text-white p-2 w-12 h-12 border rounded bg-blog-black border-blog-borderBlack fixed"
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
              className="block sm:hidden text-white p-2 w-12 h-12 border rounded bg-blog-black border-blog-borderBlack fixed z-10"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon
                icon={faXmark}
                style={{ width: "14px", height: "16px" }}
              />
            </button>
            <div className="fixed top-0 left-0 w-full h-screen bg-blog-black px-10 pt-12 overflow-y-auto">
              <ul className="text-white" onClick={toggleMenu}>
                <li className="py-2 border-b">ダッシュボード</li>
                <Link href="/">
                  <li className="py-2 mx-4 transition duration-300 hover:bg-gray-300 hover:text-gray-900">
                    ブログTOP
                  </li>
                </Link>
                <Link href="/dashboard">
                  <li className="py-2 mx-4 transition duration-300 hover:bg-gray-300 hover:text-gray-900">
                    サイト制作のメモ
                  </li>
                </Link>
                <li className="py-2 border-b mt-3">記事</li>
                <Link href="/dashboard/post">
                  <li className="py-2 mx-4 transition duration-300 hover:bg-gray-300 hover:text-gray-900">
                    記事一覧
                  </li>
                </Link>
                <Link href="/dashboard/post/new-post">
                  <li className="py-2 mx-4 transition duration-300 hover:bg-gray-300 hover:text-gray-900">
                    新規記事
                  </li>
                </Link>
                <li className="py-2 mt-3 border-b">カテゴリー</li>
                <Link href="/dashboard/category">
                  <li className="py-2 mx-4 transition duration-300 hover:bg-gray-300 hover:text-gray-900">
                    カテゴリ一覧
                  </li>
                </Link>
                <Link href="/dashboard/category/new-category">
                  <li className="py-2 mx-4 transition duration-300 hover:bg-gray-300 hover:text-gray-900">
                    カテゴリ追加
                  </li>
                </Link>
                <li className="py-2 mt-3 border-b">画像</li>
                <Link href="/dashboard/image">
                  <li className="py-2 mx-4 transition duration-300 hover:bg-gray-300 hover:text-gray-900">
                    画像一覧
                  </li>
                </Link>
                <Link href="/dashboard/image/new-image">
                  <li className="py-2 mx-4 transition duration-300 hover:bg-gray-300 hover:text-gray-900">
                    画像追加
                  </li>
                </Link>
              </ul>
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

export default DashboardSideMenu;
