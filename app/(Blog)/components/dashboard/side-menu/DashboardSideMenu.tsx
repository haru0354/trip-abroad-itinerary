import {
  faList,
  faPen,
  faImage,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

import MenuBox from "../../ui/MenuBox";
import HamburgerMenu from "./HamburgerMenu";
import BlogLogoutButton from "../../ui/BlogLogoutButton";

const DashboardSideMenu = () => {
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
          <BlogLogoutButton />
        </nav>
      </div>
      <HamburgerMenu />
    </>
  );
};

export default DashboardSideMenu;
