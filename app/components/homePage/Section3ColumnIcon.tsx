"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAsia,
  faPlaneDeparture,
  faCartFlatbedSuitcase,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedItem from "../lib/AnimatedItem";

type Section3ColumnIconProps = {
  title: string;
  name1: string;
  name2: string;
  name3: string;
  content1: string;
  content2: string;
  content3: string;
};

const Section3ColumnIcon: React.FC<Section3ColumnIconProps> = ({
  title,
  name1,
  name2,
  name3,
  content1,
  content2,
  content3,
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 1.4,
        staggerChildren: 0.7,
        duration: 1.2,
      },
    },
  };

  const item = {
    hidden: { x: 80, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
      },
    },
  };

  return (
    <div className="w-full py-4 bg-white rounded">
      <div className="text-center my-6">
        <AnimatedItem
          elementType="h2"
          animation="fadeInVariants"
          className="bg-blue-400 text-xl font-semibold text-white rounded my-10 p-5"
        >
          {title}
        </AnimatedItem>
      </div>
      <div className="flex w-full my-10 flex-wrap items-center justify-center">
        <AnimatedItem
          animation="fadeInVariants"
          elementType="div"
          className="border-2 border-sky-600 rounded w-[28%] mx-2 my-4 px-4 md:px-8 py-6 flex flex-col min-w-[330px] min-h-[330px]"
        >
          <span className="text-blue-500  flex justify-center mb-6">
            <FontAwesomeIcon icon={faEarthAsia} style={{ fontSize: "2em" }} />
          </span>
          <h3 className="text-gray-700 mb-6 text-center text-xl font-semibold">
            {name1}
          </h3>
          <p className="text-gray-700 mb-6">{content1}</p>
        </AnimatedItem>
        <AnimatedItem
          animation="fadeInVariants"
          elementType="div"
          className="border-2 border-sky-600 rounded w-[28%] mx-2 my-4 px-4 md:px-8 py-6 flex flex-col min-w-[330px] min-h-[330px]"
        >
          <span className="text-blue-500  flex justify-center mb-6">
            <FontAwesomeIcon
              icon={faPlaneDeparture}
              style={{ fontSize: "2em" }}
            />
          </span>
          <h3 className="text-gray-700 mb-6 text-center text-xl font-semibold">
            {name2}
          </h3>
          <p className="text-gray-700 mb-6">{content2}</p>
        </AnimatedItem>
        <AnimatedItem
          animation="fadeInVariants"
          elementType="div"
          className="border-2 border-sky-600 rounded w-[28%] mx-2 my-4 px-4 md:px-8 py-6 flex flex-col min-w-[330px] min-h-[330px]"
        >
          <span className="text-blue-500  flex justify-center mb-6">
            <FontAwesomeIcon
              icon={faCartFlatbedSuitcase}
              style={{ fontSize: "2em" }}
            />
          </span>
          <h3 className="text-gray-700 mb-6 text-center text-xl font-semibold">
            {name3}
          </h3>
          <p className="text-gray-700 mb-6">{content3}</p>
        </AnimatedItem>
      </div>
    </div>
  );
};

export default Section3ColumnIcon;
