"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type AnimatedItemProps = {
  elementType: "div" | "h2" | "h3" | "li" | "p";
  className?: string;
  children: ReactNode;
  animation:
    | "fadeInOpacity"
    | "fadeInVariants"
    | "fadeInAndScaleVariants"
    | "fadeInLeftVariants"
    | "fadeInRightVariants"
    | "borderVariants";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
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
  const MotionComponent = motion[elementType];

  const fadeInOpacity = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: delay || 0,
        duration: 0.5,
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay || 0,
        duration: 0.5,
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
        duration: 0.5,
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
        duration: 0.5,
      },
    },
  };

  const fadeInRightVariants = {
    hidden: { opacity: 0, x: 300 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: delay || 0,
        duration: 0.5,
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
        duration: 0.5,
      },
    },
  };

  const animations = {
    fadeInOpacity,
    fadeInVariants,
    fadeInAndScaleVariants,
    fadeInLeftVariants,
    fadeInRightVariants,
    borderVariants,
  };

  return (
    <MotionComponent
      variants={animations[animation]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
      onClick={onClick}
      style={imageUrl ? { backgroundImage: `url('${imageUrl}')` } : undefined}
    >
      {children}
    </MotionComponent>
  );
};

export default AnimatedItem;
