import Image from "next/image";
import Link from "next/link";

import SideMenuContainer from "./SideMenuContainer";

type SideImageProps = {
  src: string;
  alt: string;
  href: string;
  textTitle?: string;
};

const SideImage: React.FC<SideImageProps> = ({ src, alt, href, textTitle }) => {
  const hoverStyle = textTitle
    ? "hover:bg-blog-hoverBlue transition duration-300"
    : "hover:-translate-y-2 translate transition duration-300";

  return (
    <SideMenuContainer addClass={hoverStyle}>
      <Link href={href}>
        <Image
          src={src}
          alt={alt}
          width={240}
          height={174}
          style={{
            width: "240px",
            height: "auto",
          }}
          className="block mx-auto"
        />
        {textTitle && <p className="text-center my-2">{textTitle}</p>}
      </Link>
    </SideMenuContainer>
  );
};

export default SideImage;
