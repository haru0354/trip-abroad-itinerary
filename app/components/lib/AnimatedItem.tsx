"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ReactNode } from "react";

type AnimatedItemProps = {
  elementType: "div" | "h2" | "h3" | "li" | "p";
  className?: string;
  children: ReactNode;
  animation:
    | "fadeInVariants"
    | "fadeInAndScaleVariants"
    | "fadeInLeftVariants"
    | "borderVariants";
  onClick?: (e: React.MouseEvent) => void;
  imageUrl?: string;
  delay?: number;
};

const AnimatedItem: React.FC<AnimatedItemProps> = ({
  className,
  children,
  elementType,
  animation,
  onClick,
  imageUrl,
  delay,
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const MotionComponent = motion[elementType];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay || 0, 
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
        delay: delay || 0, 
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
        delay: delay || 0, 
        duration: 1.8,
      },
    },
  };

  const borderVariants = {
    hidden: {
      width: 0,
      x: "100%",
    },
    visible: {
      width: "100%",
      x: "0%",
      transition: {
        duration: 7.0,
      },
    },
  };

  const animations = {
    fadeInVariants,
    fadeInAndScaleVariants,
    fadeInLeftVariants,
    borderVariants,
  };

  return (
    <MotionComponent
      variants={animations[animation]}
      onAnimationComplete={() => setHasAnimated(true)}
      initial={hasAnimated ? "visible" : "hidden"}
      whileInView="visible"
      className={className}
      onClick={onClick}
      style={imageUrl ? { backgroundImage: `url('${imageUrl}')` } : undefined}
    >
      {children}
    </MotionComponent>
  );
};

export default AnimatedItem;
