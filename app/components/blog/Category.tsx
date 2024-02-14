import Link from "next/link";

const Category = () => {
  return (
    <div className="w-full p-2">
      <h3 className="bg-green-600 text-white font-bold px-2 py-4">
        カテゴリー
      </h3>
      <ul>
        <li className="py-4 hover:bg-gray-200">
          <Link href="./">
            <p className="text-gray-600">TOPページ</p>
          </Link>
        </li>
        <li className="py-4 hover:bg-gray-200">
          <Link href="./">
            <p className="text-gray-600">TOPページ</p>
          </Link>
        </li>
        <li className="py-4 hover:bg-gray-200">
          <Link href="./">
            <p className="text-gray-600">TOPページ</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Category;
