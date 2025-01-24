"use client";
import { motion } from "framer-motion";

import React, { useState, useEffect } from "react";

const AnimatedRec = ({size, scale}) => {
  const path = [
    { x: -10 * scale, y: -10 * scale },
    { x: (size.w - 20) * scale, y: -10 * scale },
    { x: (size.w - 20) * scale, y: (size.h - 20) * scale },
    { x: -10 * scale, y: (size.h - 20) * scale },
    { x: -10 * scale, y: -10 * scale },
  ];

  return (
    <div
      style={{
        backgroundColor: "red",
        position: "relative",
        top: `0px`, 
        left: `0px`,
        width: `100%`,
        height: `100%`,
        border: `${10 * scale}px solid rgb(66, 5, 48)`,
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
          borderRadius: "10%", // To make it a circle
        }}
        animate={{
          x: path.map((point) => point.x),
          y: path.map((point) => point.y),
        }}
        transition={{
          repeat: Infinity,
          duration: 5 / scale, // Speed adjusted by scale
          ease: "linear",
        }}
      />
      </>
    </div>
  );
};

export default AnimatedRec;
