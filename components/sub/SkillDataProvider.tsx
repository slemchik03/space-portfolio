"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  src: string;
  width: number;
  height: number;
  scale?: number;
  index: number;
}

const SkillDataProvider = ({ src, width, height, index, scale }: Props) => {
  return (
    <motion.div custom={index} animate={{ scale }}>
      <Image src={src} width={width} height={height} alt="skill image" />
    </motion.div>
  );
};

export default SkillDataProvider;
