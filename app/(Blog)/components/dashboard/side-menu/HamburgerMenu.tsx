import { signOut } from "next-auth/react";
import Button from "@/app/components/ui/button/Button";
import Items from "./Items";

type HamburgerMenuProps = {
  toggleMenu: () => void;
};

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ toggleMenu }) => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin" });
  };

  return (
    <div
      className="w-full h-full bg-white fixed top-0 left-0 "
      onClick={toggleMenu}
    >
      <div
        className="max-w-[300px] w-[80%] h-screen bg-blog-black px-10 pt-12 overflow-y-auto z-10"
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
            { name: "カテゴリ追加", href: "/dashboard/category/new-category" },
          ]}
        />
        <Items
          title="画像"
          items={[
            { name: "画像一覧", href: "/dashboard/image" },
            { name: "画像追加", href: "/dashboard/image/new-image" },
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
      </div>{" "}
    </div>
  );
};

export default HamburgerMenu;
