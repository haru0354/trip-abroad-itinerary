"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ReactNode } from "react";

type AnimatedItemProps = {
  elementType: "div" | "h2" | "h3" | "li" | "p";
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  animation: "fadeInVariants" | "fadeInAndScaleVariants";
};

const AnimatedItem: React.FC<AnimatedItemProps> = ({
  className,
  children,
  elementType,
  animation,
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const MotionComponent = motion[elementType];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
      },
    },
  };

  const fadeInAndScaleVariants = {
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

  const animations = {
    fadeInVariants,
    fadeInAndScaleVariants,
  };

  return (
    <MotionComponent
      variants={animations[animation]}
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
