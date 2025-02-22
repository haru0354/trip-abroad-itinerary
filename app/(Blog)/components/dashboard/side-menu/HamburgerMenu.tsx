"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import Items from "./Items";
import BlogLogoutButton from "../../ui/BlogLogoutButton";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";

const HamburgerMenu = () => {
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
    setIsOpen((prev) => !prev);
  };

  const closeMenu = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget === e.target) {
      toggleMenu();
    }
  };

  return (
    <>
      <button
        className="block fixed sm:hidden p-3 w-12 h-12 border rounded text-white bg-blog-black bg-opacity-80 border-blog-borderBlack z-[100]"
        onClick={toggleMenu}
      >
        <FontAwesomeIcon
          icon={isOpen ? faXmark : faBars}
          style={{ width: "22px", height: "22px" }}
        />
      </button>
      {isOpen && (
        <div
          className="w-full h-full  fixed top-0 left-0 bg-gray-500 bg-opacity-90"
          onClick={closeMenu}
        >
          <AnimatedItem
            elementType="div"
            animation="fadeInLeftVariants"
            className="max-w-[300px] w-[80%] h-screen bg-blog-black px-8 pt-12 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Items
              title="ダッシュボード"
              items={[
                { name: "ブログTOP", href: "/" },
                { name: "サイト制作のメモ", href: "/dashboard" },
              ]}
            />
            <Items
              title="記事"
              items={[
                { name: "記事一覧", href: "/dashboard/post" },
                { name: "新規記事", href: "/dashboard/post/new-post" },
              ]}
            />
            <Items
              title="カテゴリ"
              items={[
                { name: "カテゴリ一覧", href: "/dashboard/category" },
                {
                  name: "カテゴリ追加",
                  href: "/dashboard/category/new-category",
                },
              ]}
            />
            <Items
              title="画像"
              items={[
                { name: "画像一覧", href: "/dashboard/image" },
                { name: "画像追加", href: "/dashboard/image/new-image" },
              ]}
            />
            <BlogLogoutButton />
          </AnimatedItem>
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
