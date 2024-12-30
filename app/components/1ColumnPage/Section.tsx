import { ReactNode } from "react";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";

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
          className="flex items-center mx-0 py-8  "
        >
          <span className="flex-grow h-1 w-5 md:w-0 mr-1 md:mr-4 bg-gradient-to-l from-gray-600 to-transparent"></span>
          <h2 className="text-2xl md:text-3xl py-0 my-5 text-gray-700 text-center font-bold bg-transparent">
            {name}
          </h2>
          <span className="flex-grow h-1 w-5 md:w-0 mr-1 md:mr-4 bg-gradient-to-r from-gray-600 to-transparent"></span>
        </AnimatedItem>
        {children}
      </div>
    </section>
  );
};

export default Section;
