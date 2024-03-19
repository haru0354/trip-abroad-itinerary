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
      <div className="max-w-[1150px] w-full py-2 md:py-6 px-4 mx-auto">
        <AnimatedItem
          elementType="div"
          animation="fadeInVariants"
          className=" flex items-center mx-0 text-center text-2xl md:text-3xl py-8 bg-transparent text-gray-700 font-bold"
        >
          <span className="flex-grow h-1 w-5 md:w-0 mr-1 md:mr-4 bg-gradient-to-l from-gray-600 to-transparent"></span>
          {name}
          <span className="flex-grow h-1 w-5 md:w-0 mr-1 md:mr-4 bg-gradient-to-r from-gray-600 to-transparent"></span>
        </AnimatedItem>
        {children}
      </div>
    </section>
  );
};

export default Section;
