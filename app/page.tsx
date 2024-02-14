import Link from "next/link";

export default function Home() {
  return (
    <>
      <p>このページはサイトのtopページにする</p>
      <ul>
        <li>
        <a href="./kaigaiapp/">ブログへ</a>
        </li>
        <li>
          <a href="./travel_brochure/">アプリtop</a>
        </li>
        <li>
        <a href="./travel_brochure/itinerary">旅程表</a>

          <Link href="./travel_brochure/itinerary">旅程表</Link>
        </li>
      </ul>
    </>
  );
}
