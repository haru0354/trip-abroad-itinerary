"use client";

import { useFormStatus } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faPenToSquare,
  faHouse,
  faSquareCaretDown,
  faSquareCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

type ButtonImageProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
  size: "footer" | "small";
  icon: "pen" | "house" | "plane" | "plus"| "down" | "up";
};

const ButtonImage: React.FC<ButtonImageProps> = ({
  children,
  className,
  iconClassName,
  size,
  icon,
  onClick,
}) => {
  const { pending } = useFormStatus();

  const sizes = {
    footer:
      "flex flex-1 flex-col items-center justify-center w-full h-full",
    small:
      "px-4 block ml-auto border border-dashed border-gray-400 text-sm rounded",
  };

  const iconImages = {
    pen: faPenToSquare,
    house: faHouse,
    plane: faPlane,
    plus: faSquarePlus,
    down: faSquareCaretDown,
    up: faSquareCaretUp,
  };

  const selectedIcon = iconImages[icon];

  return (
    <button
      className={`hover:bg-gray-300
       ${className}  ${sizes[size]} ${pending ? "opacity-30" : ""}`}
      disabled={pending}
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={selectedIcon}
        className={`
       ${iconClassName}`}
      />
      <span>{children}</span>
    </button>
  );
};

export default ButtonImage;
