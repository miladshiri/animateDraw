"use client";
import { motion } from "framer-motion";

import React, { useState, useEffect } from "react";

const AnimatedRec = ({size, scale}) => {
  const factor = 0.2;
  const path = [
    { x: 0, y: 0 },
    { x: (size.w - size.w * factor) * scale, y: 0 },
    { x: (size.w - size.w * factor) * scale, y: (size.h - size.h * factor) * scale },
    { x: 0 , y: (size.h - size.h * factor) * scale },
    { x: 0, y: 0 },
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
          width: `${size.w * factor * scale}px`, // Scaled circle size
          height: `${size.h * factor * scale}px`, // Scaled circle size
          backgroundColor: "#aaaaaa",
          borderRadius: "0%", // To make it a circle
        }}
        animate={{
          x: path.map((point) => point.x),
          y: path.map((point) => point.y),
        }}
        transition={{
          repeat: Infinity,
          duration: 0.2 / scale, // Speed adjusted by scale
          ease: "linear",
        }}
      />
      </>
      <div
        style={{
          position: "absolute",
          inset: `${5 * scale}px`,
          background: "#2a2a2a"

        }}  
      ></div>
    </div>
  );
};

export default AnimatedRec;
