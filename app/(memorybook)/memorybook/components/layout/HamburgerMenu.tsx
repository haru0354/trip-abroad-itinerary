"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import AnimatedItem from "@/app/lib/animation/AnimatedItem";
import Button from "@/app/components/ui/button/Button";

type HamburgerMenuProps = {
  children: React.ReactNode;
  color: "black" | "white";
  positionLeft?: boolean;
};

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  children,
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
      document.body.style.overflow = "auto";
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
        className={`${buttonPositions} ${colors[color]} fixed top-2 block sm:hidden p-3 w-12 h-12 ml-[2px] border border-gray-200 rounded z-10`}
        onClick={toggleMenu}
      >
        <FontAwesomeIcon
          icon={isOpen ? faXmark : faBars}
          style={{ width: "14px", height: "22px" }}
        />
      </button>
      {isOpen && (
        <AnimatedItem
          className="sm:hidden fixed top-0 left-0 w-full h-screen px-10 pt-16 bg-gray-500 overflow-y-auto"
          elementType="div"
          animation={
            positionLeft ? "fadeInLeftVariants" : "fadeInRightVariants"
          }
        >
          {children}
          <Button
            color="white"
            size="normal"
            className="rounded mt-12"
            onClick={toggleMenu}
          >
            ← Close
          </Button>
        </AnimatedItem>
      )}
    </>
  );
};

export default HamburgerMenu;
