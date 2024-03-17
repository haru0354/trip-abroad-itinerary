"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ReactNode } from "react";

type AnimatedItemProps = {
  elementType: "div" | "h2" | "h3" | "li";
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

const AnimatedItem: React.FC<AnimatedItemProps> = ({
  className,
  children,
  elementType,
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const MotionComponent = motion[elementType];
  const variants = {
    hidden: { opacity: 0, y: 20, scale: 0 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.5,
      },
    },
  };

  return (
    <MotionComponent
      variants={variants}
      onAnimationComplete={() => setHasAnimated(true)}
      initial={hasAnimated ? "visible" : "hidden"}
      whileInView="visible"
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

export default AnimatedItem;
