"use client";

import { useEffect, useState } from "react";

type BackToTopButtonProps = {
  itineraryPage?: boolean;
};

const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  itineraryPage = false,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const bottomStyle = itineraryPage
    ? "bottom-20 md:bottom-24"
    : "bottom-4 md:bottom-16";

  return (
    <>
      {isVisible && (
        <button
          onClick={backToTop}
          type="button"
          className={`fixed right-4 py-2 px-4 font-bold rounded-full text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-400 shadow-lg duration-300 transition-colors z-10 ${bottomStyle}`}
        >
          トップへ戻る
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
