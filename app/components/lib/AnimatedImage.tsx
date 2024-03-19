"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type AnimatedImageProps = {
  animation: "fadeInRightImage" | "footerImage" | "fadeIntImage";
  src: string;
  width: string;
  height: string;
  alt: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  delay?: number;
};

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  className,
  animation,
  onClick,
  src,
  width,
  height,
  alt,
  delay,
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  const fadeInRightImage = {
    hidden: { opacity: 0, x: "300%" },
    visible: {
      opacity: 1,
      x: "0%",
      transition: {
        delay: delay || 0,
        duration: 3,
      },
    },
  };

  const fadeIntImage = {
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

  const footerImage = {
    hidden: { opacity: 0.7, x: "150%", y: "-80%" },
    visible: {
      opacity: 0,
      x: "-100%",
      y: "-300%",
      transition: {
        delay: delay || 0,
        duration: 3,
      },
    },
  };

  const animations = {
    fadeInRightImage,
    footerImage,
    fadeIntImage,
  };

  return (
    <motion.img
      src={src}
      width={width}
      height={height}
      alt={alt}
      variants={animations[animation]}
      onAnimationComplete={() => setHasAnimated(true)}
      initial={hasAnimated ? "visible" : "hidden"}
      whileInView="visible"
      className={className}
      onClick={onClick}
    />
  );
};

export default AnimatedImage;
