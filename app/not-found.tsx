import Link from "next/link";
import type { Metadata } from "next";

import Header from "./(memorybook)/memorybook/components/layout/header/Header";
import Footer from "./(memorybook)/memorybook/components/layout/footer/Footer";
import AnimatedItem from "./lib/animation/AnimatedItem";
import BackButton from "./components/ui/button/BackButton";

export const metadata: Metadata = {
  robots: {
    index: false,
  },
};

const NotFound = () => {
  return (
    <>
      <Header />
      <main>
        <AnimatedItem
          elementType="div"
          animation="fadeInVariants"
          className="main-contents-area"
        >
          <h1 className="text-2xl py-8 text-gray-700 font-bold">404NotFound</h1>
          <p>指定されたファイルまたはディレクトリは存在しません。</p>
          <div>
            <ul>
              <li className="my-4">
                <Link href="/memorybook" className="text-itinerary-linkBlue">
                  旅のメモリーブック
                </Link>
                (旅程表アプリ)
              </li>
              <li className="my-4">
                <Link href="/" className="text-itinerary-linkBlue">
                  トラベルメモリー
                </Link>
                (旅のお役立ちブログ)
              </li>
            </ul>
            <BackButton />
          </div>
        </AnimatedItem>
      </main>
      <Footer isTopAppDirectory={true} />
    </>
  );
};

export default NotFound;
