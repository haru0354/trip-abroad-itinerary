import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <div>
        <Link href="./memo">
          memo        
        </Link>
        </div>
        <div>
        <Link href="./itinerary">
          itinerary
        </Link>
        </div>
      </div>
    </main>
  );
}
