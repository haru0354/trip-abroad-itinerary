import Link from "next/link";

export default function Home() {
  return (
    <>
      <p>このページはサイトのtopページにする</p>
      <ul>
      <li>
          <Link href="./home/">ブログ管理</Link>
        </li>
        <li>
          <Link href="./kaigai/">ブログへ</Link>
        </li>
        <li>
          <Link href="./travel_brochure/">アプリtop</Link>
        </li>
        <li>
          <Link href="./travel_brochure/itinerary">旅程表</Link>
        </li>
      </ul>
    </>
  );
}
