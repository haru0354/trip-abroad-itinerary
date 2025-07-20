import AnimatedItem from "@/app/lib/animation/AnimatedItem";
import ButtonNextLink from "../ui/button/ButtonNextLink";
import SignupModal from "@/app/(memorybook)/memorybook/components/ui/auth/SignupModal";
import SignupModalTrigger from "@/app/(memorybook)/memorybook/components/ui/auth/SignupModalTrigger ";

type HeroProps = {
  src: string;
  title: string;
  secondTitle?: string;
  contents?: string[];
  signUp?: boolean;
  href?: string;
};

const Hero: React.FC<HeroProps> = ({
  src,
  title,
  secondTitle,
  contents,
  signUp = false,
  href,
}) => {
  return (
    <div
      className="flex justify-center items-center w-full px-2 py-10 md:py-28 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${src})` }}
    >
      <AnimatedItem
        elementType="div"
        animation="fadeInVariants"
        className="px-2 py-4 md:px-10 md:py-6 text-center rounded bg-white md:bg-opacity-90"
      >
        <p className="font-semibold mb-3 text-lg md:text-2xl">{title}</p>
        {secondTitle && (
          <p className="font-bold mb-3 text-lg md:text-2xl text-sky-500">
            {secondTitle}
          </p>
        )}
        {contents &&
          contents.map((content) => (
            <p key={content} className="mb-2">
              {content}
            </p>
          ))}
        {signUp ? (
          <SignupModalTrigger id="last-signup" />
        ) : (
          href && (
            <div className="text-center">
              <ButtonNextLink href={href} className="mt-4 rounded">
                詳細はコチラ
              </ButtonNextLink>
            </div>
          )
        )}
      </AnimatedItem>
    </div>
  );
};

export default Hero;
