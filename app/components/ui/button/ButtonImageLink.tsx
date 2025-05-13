import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faPenToSquare,
  faHouse,
  faSquareCaretDown,
  faSquareCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

type ButtonImageLinkProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
  iconClassName?: string;
  size: "footer" | "small";
  icon: "pen" | "house" | "plane" | "plus" | "down" | "up";
};

const ButtonImageLink: React.FC<ButtonImageLinkProps> = ({
  children,
  href,
  className,
  iconClassName,
  size,
  icon,
}) => {
  const sizes = {
    footer: "flex flex-1 flex-col items-center justify-center w-full h-full",
    small: "px-4 text-sm border rounded border-dashed border-gray-400",
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
    <Link
      href={href}
      className={`hover:bg-gray-300 transition duration-300
       ${className}  ${sizes[size]} `}
    >
      <FontAwesomeIcon
        icon={selectedIcon}
        className={`
       ${iconClassName}`}
      />
      {children}
    </Link>
  );
};

export default ButtonImageLink;
