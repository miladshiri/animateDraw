"use client";
import { motion } from "framer-motion";

import React, { useState, useEffect } from "react";

const AnimatedRec = ({size, shapeSettings}) => {
  const factor = 0.2;
  const path = [
    { x: 0, y: 0 },
    { x: (size.w - size.w * factor), y: 0 },
    { x: (size.w - size.w * factor), y: (size.h - size.h * factor) },
    { x: 0 , y: (size.h - size.h * factor) },
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
        border: `${(size.w + size.h) / 340}px solid ${shapeSettings ? shapeSettings.borderColor :"#51b39a"}`,
        userSelect: "none",
      }}
    >
      <>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${size.w * factor}px`,
          height: `${size.h * factor}px`,
          backgroundColor: "#aaaaaa",
          borderRadius: "0%",
        }}
        animate={{
          x: path.map((point) => point.x),
          y: path.map((point) => point.y),
        }}
        transition={{
          repeat: Infinity,
          duration: 0.4,
          ease: "linear",
        }}
      />
      </>
      <div
        style={{
          position: "absolute",
          inset: `${(size.w + size.h) / 140}px`,
          background: "#2a2a2a"

        }}  
      ></div>
    </div>
  );
};

export default AnimatedRec;
