import { ReactNode } from "react";
import AnimatedItem from "../lib/AnimatedItem";

type SectionProps = {
  children: ReactNode;
  name: string;
  bgColor: String;
};

const Section: React.FC<SectionProps> = ({ children, bgColor, name }) => {
  return (
    <section className={`${bgColor}`}>
      <div className="max-w-[1150px] w-full py-2 md:py-10 px-4  mx-auto">
        <AnimatedItem
          elementType="h2"
          animation="fadeInVariants"
          className="text-center text-2xl md:text-3xl py-8 bg-transparent text-gray-700 font-bold !important"
        >
          {name}
        </AnimatedItem>
        {children}
      </div>
    </section>
  );
};

export default Section;
