import Link from "next/link";

const HeaderItinerary = () => {
  return (
    <header>
      <div className="flex justify-between items-center border-b h-16 mx-10">
        <Link href="../">HOME </Link>
        <ul className="flex">
          <li className="ml-4">
            <Link href="../memo">ログイン</Link>
          </li>
          <li className="ml-4">
            <Link href="../itinerary">itinerary</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default HeaderItinerary;
