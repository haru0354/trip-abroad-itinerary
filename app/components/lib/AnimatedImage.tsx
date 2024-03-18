"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type AnimatedImageProps = {
  animation: "fadeInRightImage";
  src: string;
  width: string;
  height: string;
  alt: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
};

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  className,
  animation,
  onClick,
  src,
  width,
  height,
  alt,
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  const fadeInRightImage = {
    hidden: { opacity: 0, x: "300%" },
    visible: {
      opacity: 1,
      x: "0%",
      transition: {
        duration: 3,
      },
    },
  };

  const animations = {
    fadeInRightImage,
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
