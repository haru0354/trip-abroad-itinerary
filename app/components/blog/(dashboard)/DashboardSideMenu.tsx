import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faPen,
  faImage,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

const DashboardSideMenu = () => {
  return (
    <>
      <div className="h-screen w-72 flex flex-col sm:flex-row sm:justify-around bg-gray-700">
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
              <Link href="/dashboard/new-category">
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
