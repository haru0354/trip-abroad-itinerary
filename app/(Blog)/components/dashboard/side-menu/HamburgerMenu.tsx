import Link from "next/link";
import { signOut } from "next-auth/react";
import Button from "@/app/components/ui/Button";

const HamburgerMenu = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin" });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-blog-black px-10 pt-12 overflow-y-auto">
      <ul className="text-white">
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
  );
};

export default HamburgerMenu;
