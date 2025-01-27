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
          fontSize: `${13 * scale}px`,
          color: "#ff0",
          padding: "0px",
          textShadow: "0 0 30px #FFFF7F, 0 0 60px #FFFFB3, 0 0 120px #FFFFB3",
          filter: "drop-shadow(0 0 60px #FFFF7F)",
        }}
        animate={{
            x: path.map((point) => point.x),
            y: path.map((point) => point.y),
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        ★
      </motion.div>
      </>
    </div>
  );
};

export default AnimatedRec;
