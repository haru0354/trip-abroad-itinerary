"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import AnimatedItem from "@/app/lib/animation/AnimatedItem";
import Button from "@/app/components/ui/button/Button";
import LoginModal from "../../ui/auth/LoginModal";
import SignupModal from "../../ui/auth/SignupModal";

type HamburgerMenuProps = {
  color: "black" | "white";
  positionLeft?: boolean;
};

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  color,
  positionLeft = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const buttonPositions = positionLeft ? "left-2" : "right-2";
  const colors = {
    black: "text-white bg-gray-700 border-itinerary-borderBlack",
    white: "text-gray-700 bg-white border-itinerary-borderBlack",
  };

  return (
    <>
      <button
        className={`${buttonPositions} ${colors[color]} fixed sm:hidden top-2 right-2 flex flex-col items-center justify-center w-12 h-12 border rounded  border-itinerary-borderBlack z-[100]`}
        onClick={toggleMenu}
      >
        <FontAwesomeIcon
          icon={isOpen ? faXmark : faBars}
          style={{ width: "18px", height: "22px" }}
        />
        <span className="text-xs text-center">MENU</span>
      </button>
      {isOpen && (
        <AnimatedItem
          className="sm:hidden fixed top-0 left-0 w-full h-screen px-10 pt-16 bg-gray-500 overflow-y-auto z-50"
          elementType="div"
          animation={
            positionLeft ? "fadeInLeftVariants" : "fadeInRightVariants"
          }
        >
          <ul className="text-white">
            <li className="my-2 px-4 py-2 border-b hover:bg-white hover:text-gray-700 transition-colors duration-300">
              <LoginModal />
            </li>
            <li className="my-2 px-4 py-2 border-b hover:bg-white hover:text-gray-700 transition-colors duration-300">
              <SignupModal textButton={true} id="header-signup" />
            </li>
          </ul>
          <Button
            color="white"
            size="normal"
            className="rounded mt-12"
            onClick={toggleMenu}
          >
            閉じる
          </Button>
        </AnimatedItem>
      )}
    </>
  );
};

export default HamburgerMenu;
