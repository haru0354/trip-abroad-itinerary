"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faPen,
  faImage,
  faHouse,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Button from "@/app/components/ui/button/Button";
import MenuBox from "../../ui/MenuBox";
import HamburgerMenu from "./HamburgerMenu";

const DashboardSideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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
              className="block sm:hidden text-white p-2 w-12 h-12 border rounded bg-blog-black border-blog-borderBlack fixed z-50"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon
                icon={faXmark}
                style={{ width: "14px", height: "16px" }}
              />
            </button>
            <HamburgerMenu toggleMenu={toggleMenu} />
          </>
        )}
      </div>
    </>
  );
};

export default DashboardSideMenu;
