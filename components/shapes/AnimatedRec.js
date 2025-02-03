"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

import React, { useState, useEffect } from "react";

const AnimatedRec = ({size, shapeSettings}) => {
  
  const speed = useMemo(() => {
    if (shapeSettings.animationSpeed === "slow") return 5;
    if (shapeSettings.animationSpeed === "normal") return 1;
    return 0.4;
  }, [shapeSettings.animationSpeed]);

  // var speed = 1;
  // if (shapeSettings.animationSpeed == 'slow') {
  //   speed = 5;
  // }
  // else if (shapeSettings.animationSpeed == 'normal') {
  //   speed = 1;
  // }
  // else {
  //   speed = 0.4;
  // }

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
      <AnimatePresence mode="wait"> 
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
          duration: speed,
          ease: "linear",
        }}
      />
      </AnimatePresence>
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
