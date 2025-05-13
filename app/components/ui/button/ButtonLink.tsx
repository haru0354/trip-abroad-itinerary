type ButtonLinkProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
  color?: "blue" | "gray" | "red" | "white";
  size?: "normal" | "small";
};

const ButtonLink: React.FC<ButtonLinkProps> = ({
  children,
  href,
  className,
  color = "blue",
  size = "normal",
}) => {
  const colors = {
    blue: "border-sky-900 bg-sky-700",
    gray: "border-gray-900 bg-gray-700",
    red: "border-red-900 bg-red-700",
    white: "border-gray-900 bg-gray-500",
  };

  const sizes = {
    normal: "min-w-[170px] px-10 py-2",
    small: "min-w-[100px] px-6 py-1",
  };

  return (
    <a
      href={href}
      className={`inline-block mx-auto font-semibold border shadow text-white hover:text-black hover:bg-white transition duration-300 
        ${className}
        ${sizes[size]}
        ${colors[color]}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default ButtonLink;
