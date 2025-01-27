"use client";
import { motion } from "framer-motion";

import React, { useState, useEffect } from "react";

const AnimatedRec = ({size, scale}) => {
  const path = [
    { x: -6 * scale, y: -6 * scale },
    { x: (size.w - 8) * scale, y: -6 * scale },
    { x: (size.w - 8) * scale, y: (size.h - 8) * scale },
    { x: -6 * scale, y: (size.h - 8) * scale },
    { x: -6 * scale, y: -6 * scale },
  ];

  return (
    <div
      style={{
        backgroundColor: "transparent",
        position: "relative",
        top: `0px`, 
        left: `0px`,
        width: `100%`,
        height: `100%`,
        border: `${2 * scale}px solid #51b39a`,
        userSelect: "none",
      }}
    >
      <>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${10 * scale}px`, // Scaled circle size
          height: `${10 * scale}px`, // Scaled circle size
          backgroundColor: "#aaaaaa",
          borderRadius: "50%", // To make it a circle
        }}
        animate={{
          x: path.map((point) => point.x),
          y: path.map((point) => point.y),
        }}
        transition={{
          repeat: Infinity,
          duration: 8 / scale, // Speed adjusted by scale
          ease: "linear",
        }}
      />
      </>
    </div>
  );
};

export default AnimatedRec;
