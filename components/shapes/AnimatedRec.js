"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

import React, { useState, useEffect } from "react";
import { defaultSettings } from "../shapeToComponentMapping";

const AnimatedRec = ({size, shapeSettings}) => {

  var speed = 1;
  if (shapeSettings) {
    if (shapeSettings.animationSpeed == 'slow') {
      speed = 2;
    }
    else if (shapeSettings.animationSpeed == 'normal') {
      speed = 1;
    }
    else if (shapeSettings.animationSpeed == 'fast') {
      speed = 0.4;
    }
    else {
      speed = 0;
    }
  }

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
        border: `${(size.w + size.h) / 340}px solid ${shapeSettings ? (shapeSettings.borderColor ? shapeSettings.borderColor : defaultSettings['AnimatedRec'].borderColor) : defaultSettings['AnimatedRec'].borderColor}`,
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      <>
      {speed > 0 && (
      <motion.div
        key={speed}
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
      )}
      </>
      <div
        style={{
          position: "absolute",
          inset: `${(size.w + size.h) / 140}px`,
          background: `${shapeSettings ? (shapeSettings.shapeColor ? shapeSettings.shapeColor : defaultSettings['AnimatedRec'].shapeColor) : defaultSettings['AnimatedRec'].shapeColor}`

        }}  
      ></div>
    </div>
  );
};

export default AnimatedRec;
