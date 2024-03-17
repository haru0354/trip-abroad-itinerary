"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ReactNode } from "react";

type AnimatedItemProps = {
  elementType: "div" | "h2" | "h3" | "li" | "p";
  className?: string;
  children: ReactNode;
  animation: "fadeInVariants" | "fadeInAndScaleVariants" | "fadeInLeftVariants";
  onClick?: (e: React.MouseEvent) => void;
};

const AnimatedItem: React.FC<AnimatedItemProps> = ({
  className,
  children,
  elementType,
  animation,
  onClick,
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const MotionComponent = motion[elementType];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
      },
    },
  };

  const fadeInAndScaleVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.5 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.0,
      },
    },
  };

  const fadeInLeftVariants = {
    hidden: { opacity: 0, x: -300 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.8,
      },
    },
  };

  const animations = {
    fadeInVariants,
    fadeInAndScaleVariants,
    fadeInLeftVariants,
  };

  return (
    <MotionComponent
      variants={animations[animation]}
      onAnimationComplete={() => setHasAnimated(true)}
      initial={hasAnimated ? "visible" : "hidden"}
      whileInView="visible"
      className={className}
      onClick={onClick}
    >
      {children}
    </MotionComponent>
  );
};

export default AnimatedItem;
