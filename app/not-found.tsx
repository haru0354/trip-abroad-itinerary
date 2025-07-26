import Link from "next/link";
import type { Metadata } from "next";

import { ModalProvider } from "./context/ModalContext";
import Header from "./(memorybook)/memorybook/components/layout/header/Header";
import Footer from "./(memorybook)/memorybook/components/layout/footer/Footer";
import AnimatedItem from "./lib/animation/AnimatedItem";
import BackButton from "./components/ui/button/BackButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: {
    index: false,
  },
};

const NotFound = () => {
  return (
    <ModalProvider>
      <Header />
      <main className="flex-1 px-2">
        <AnimatedItem
          elementType="div"
          animation="fadeInVariants"
          className="flex flex-col items-center justify-center max-w-[1150px] w-full h-full mt-8 mb-8 p-4 rounded bg-white"
        >
          <h1 className="text-2xl py-8 text-gray-700 font-bold">404NotFound</h1>
          <p>指定されたファイルまたはディレクトリは存在しません。</p>
          <div>
            <ul>
              <li className="my-4">
                <Link href="/" className="text-itinerary-linkBlue">
                  旅のメモリーブック
                </Link>
                (旅程表アプリ)
              </li>
              <li className="my-4">
                <Link href="/blog" className="text-itinerary-linkBlue">
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
    </ModalProvider>
  );
};

export default NotFound;
