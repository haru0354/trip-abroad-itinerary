"use client";

import { useEffect } from "react";
import Link from "next/link";

import AnimatedItem from "./lib/animation/AnimatedItem";
import Header from "./(blog)/components/layout/blog/Header";
import BackButton from "./components/ui/button/BackButton";
import Button from "./components/ui/button/Button";
import Footer from "./(blog)/components/layout/blog/Footer";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main className="flex-1 px-2">
        <AnimatedItem
          elementType="div"
          animation="fadeInVariants"
          className="flex flex-col items-center justify-center max-w-[1150px] w-full h-full mt-8 mb-8 p-4 rounded bg-white"
        >
          <h1 className="text-2xl py-8 text-gray-700 font-bold">
            エラーが発生しました。
          </h1>
          <div className="text-center">
            <p>{error.message}</p>
            <Button onClick={() => reset()} color="neutral" size="normal">
              再試行
            </Button>
          </div>

          <div className="mt-14 pt-4 px-3 md:pt-6 md:px-6 text-center border rounded border-dashed border-gray-400">
            <p className="text-center">
              再試行を試しても上手くいかない場合は下記メニューをご利用ください。
            </p>
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
      <Footer />
    </>
  );
};

export default Error;
