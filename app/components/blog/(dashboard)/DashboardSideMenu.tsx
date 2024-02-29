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

const DashboardSideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* ハンバーガーメニュー */}
      <div>
        <button
          className="block sm:hidden text-white p-2 w-12 h-12 border rounded bg-gray-700 border-gray-800 fixed "
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        {isOpen && (
          <>
            <button
              className="block sm:hidden text-white p-2 w-12 h-12 border rounded bg-gray-700 border-gray-800 fixed z-10"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="fixed top-0 left-0 w-full h-screen bg-gray-500 px-10 pt-20 ">
              <ul className="text-white" onClick={toggleMenu}>
                <Link href="/">
                  <li className="py-2 hover:bg-gray-300 hover:text-gray-900">
                    ブログTOP
                  </li>
                </Link>
                <li className="py-2 border-b">
                  記事
                </li>
                <Link href="/dashboard">
                  <li className="py-2 hover:bg-gray-300 hover:text-gray-900">
                    記事一覧
                  </li>
                </Link>
                <Link href="/dashboard/new-post">
                  <li className="py-2 hover:bg-gray-300 hover:text-gray-900">
                    新規記事
                  </li>
                </Link>
                <li className="py-2 mt-2 border-b">
                  カテゴリー
                </li>
                <Link href="/dashboard/category">
                  <li className="py-2 hover:bg-gray-300 hover:text-gray-900">
                    カテゴリー一覧
                  </li>
                </Link>
                <Link href="/dashboard/category/new-post">
                  <li className="py-2 hover:bg-gray-300 hover:text-gray-900">
                    カテゴリー追加
                  </li>
                </Link>
                <li className="py-2 mt-2 border-b">
                  画像
                </li>
                <Link href="/dashboard/image">
                  <li className="py-2 hover:bg-gray-300 hover:text-gray-900">
                    画像一覧
                  </li>
                </Link>
                <Link href="/dashboard/image/new-post">
                  <li className="py-2 hover:bg-gray-300 hover:text-gray-900">
                    画像追加
                  </li>
                </Link>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="hidden sm:block fixed top-0 left-0 h-screen w-72 flex-col sm:flex-row sm:justify-around bg-gray-700">
        <nav className="px-6 mt-10 w-full">
          <div className="mb-6">
            <h3 className="w-full pb-2 mb-2 border-b-2 border-gray-300 text-white text-lg">
              ダッシュボード
            </h3>
            <ul>
              <Link href="/">
                <li className="flex py-4 px-2 my-1 text-white duration-300 hover:text-gray-900 hover:bg-gray-300 ">
                  <FontAwesomeIcon icon={faHouse} className="mr-2 w-5" />
                  <p className="mx-2">ブログTOP</p>
                </li>
              </Link>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="w-full pb-2 mb-2 border-b-2 border-gray-300 text-white text-lg">
              記事
            </h3>
            <ul>
              <Link href="/dashboard">
                <li className="flex py-4 px-2 my-1 text-white duration-300 hover:text-gray-900 hover:bg-gray-300 ">
                  <FontAwesomeIcon icon={faPen} className="mr-2 w-5" />
                  <p className="mx-2">記事一覧</p>
                </li>
              </Link>
              <Link href="/dashboard/new-post">
                <li className="flex py-4 px-2 my-1 text-white duration-300 hover:text-gray-900 hover:bg-gray-300 ">
                  <FontAwesomeIcon icon={faPen} className="mr-2 w-5" />
                  <p className="mx-2">新規記事</p>
                </li>
              </Link>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="w-full pb-2 mb-2 border-b-2 border-gray-300 text-white text-lg">
              カテゴリー
            </h3>
            <ul>
              <Link href="/dashboard/category">
                <li className="flex py-4 px-2 my-1 text-white duration-300 hover:text-gray-900 hover:bg-gray-300 ">
                  <FontAwesomeIcon icon={faList} className="mr-2 w-5" />
                  <p className="mx-2">カテゴリー一覧</p>
                </li>
              </Link>
              <Link href="/dashboard/category/new-category">
                <li className="flex py-4 px-2 my-1 text-white duration-300 hover:text-gray-900 hover:bg-gray-300 ">
                  <FontAwesomeIcon icon={faList} className="mr-2 w-5" />
                  <p className="mx-2">新規カテゴリー</p>
                </li>
              </Link>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="w-full pb-2 mb-2 border-b-2 border-gray-300 text-white text-lg">
              画像
            </h3>
            <ul>
              <Link href="/dashboard/image">
                <li className="flex py-4 px-2 my-1 text-white duration-300 hover:text-gray-900 hover:bg-gray-300 ">
                  <FontAwesomeIcon icon={faImage} className="mr-2 w-5" />
                  <p className="mx-2">画像一覧</p>
                </li>
              </Link>
              <Link href="/dashboard/image/new-image">
                <li className="flex py-4 px-2 my-1 text-white duration-300 hover:text-gray-900 hover:bg-gray-300 ">
                  <FontAwesomeIcon icon={faImage} className="mr-2 w-5" />
                  <p className="mx-2">新規画像</p>
                </li>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default DashboardSideMenu;
