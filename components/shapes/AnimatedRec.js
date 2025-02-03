"use client";
import { motion } from "framer-motion";

import React, { useState, useEffect } from "react";

const AnimatedRec = ({size, shapeSettings}) => {
  const factor = 0.2;
  const bar = (size.w + size.h) / 140;
  const path = [
    { x: - size.w * factor + bar, y: - size.h * factor + bar },
    { x: size.w - 2 * bar, y: - size.h * factor + bar },
    { x: size.w - 2 * bar , y: size.h - 2 * bar},
    { x: - size.w * factor + bar, y: size.h - 2 * bar },
    { x: - size.w * factor + bar, y: - size.h * factor + bar },
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
        border: `${(size.w + size.h) / 340}px solid ${shapeSettings ? (shapeSettings.borderColor ? shapeSettings.borderColor : "#51b39a") : "#51b39a"}`,
        userSelect: "none",
        overflow: "hidden",
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
          background: `${shapeSettings ? (shapeSettings.backgroundColor ? shapeSettings.backgroundColor : "#2a2a2a") : "#2a2a2a"}`

        }}  
      ></div>
    </div>
  );
};

export default AnimatedRec;
