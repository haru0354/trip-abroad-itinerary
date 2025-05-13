import Image from "next/image";

import SignupModal from "@/app/(memorybook)/memorybook/components/ui/auth/SignupModal";
import ButtonNextLink from "../ui/button/ButtonNextLink";

type HeroProps = {
  src: string;
  alt: string;
  title: string;
  secondTitle?: string;
  contents?: string[];
  signUp?: boolean;
  href?: string;
};

const Hero: React.FC<HeroProps> = ({
  src,
  alt,
  title,
  secondTitle,
  contents,
  signUp = false,
  href,
}) => {
  return (
    <div className="relative bg-sky-200 md:h-[600px] h-[300px] w-full flex items-center">
      <Image
        src={src}
        alt={alt}
        priority
        fill
        style={{
          objectFit: "cover",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex-col justify-center items-center md:w-[440px] w-[340px] md:h-[260px] h-[240px]  py-4 px-2 bg-white md:opacity-90 opacity-80 rounded text-center">
          <p className="font-semibold mb-3 text-lg md:text-2xl">{title}</p>
          {secondTitle && (
            <p className="font-bold mb-3 text-lg md:text-2xl text-sky-500">
              {secondTitle}
            </p>
          )}
          {contents && (
            <>
              {contents.map((content) => (
                <p key={content} className="mb-2">
                  {content}
                </p>
              ))}
            </>
          )}
          {signUp ? (
            <SignupModal id="hero-signup" />
          ) : (
            href && (
              <div className="text-center">
                <ButtonNextLink href={href} className="mt-4 rounded">
                  詳細はコチラ
                </ButtonNextLink>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
