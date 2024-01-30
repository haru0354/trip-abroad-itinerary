import Link from "next/link";
import HeaderItinerary from "./components/HeaderItinerary";
import FooterMenu from "./components/FooterMenu";

export default function Home() {
  return (
    <main>
      <div>
        <div>
        旅のコレクション、トラベラーズ・ダイアリー、「旅のメモリーブック」-海外旅行のしおりアプリ-
        </div>
        <div>
        <FooterMenu/>
        </div>
      </div>
    </main>
  );
}
