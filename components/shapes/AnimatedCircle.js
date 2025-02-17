"use client";
import { motion, AnimatePresence } from "framer-motion";

import React, { useState, useEffect } from "react";
import { defaultSettings } from "../shapeToComponentMapping";

const AnimatedCircle = ({size, shapeSettings}) => {

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
  const bar = (size.w + size.h) / 170;


  return (
    <div
      style={{
        backgroundColor: "transparent",
        position: "relative",
        top: `0px`,
        left: `0px`,
        width: `100%`,
        height: `100%`,
        border: `${(size.w + size.h) / 340}px solid ${shapeSettings ? (shapeSettings.borderColor ? shapeSettings.borderColor : defaultSettings['AnimatedCircle'].borderColor) : defaultSettings['AnimatedCircle'].borderColor}`,
        userSelect: "none",
        overflow: "hidden",
        borderRadius: "50%",
      }}
    >
      <>
      {speed > 0 && (
      <motion.div
        key={speed}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          paddingTop: `-${size.h * factor / 2}px`,
          width: `${(size.w + size.h)}px`,
          height: `${size.h * factor}px`,
          backgroundColor: `${shapeSettings ? (shapeSettings.flowColor ? shapeSettings.flowColor : defaultSettings['AnimatedCircle'].flowColor) : defaultSettings['AnimatedCircle'].flowColor}`,
          borderRadius: "0%",
           transformOrigin: "top left"
        }}
        animate={{ rotate: 360 }}
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
          background: `${shapeSettings ? (shapeSettings.shapeColor ? shapeSettings.shapeColor : defaultSettings['AnimatedCircle'].shapeColor) : defaultSettings['AnimatedCircle'].shapeColor}`,
          borderRadius: "50%"
        }}  
      ></div>
    </div>
  );
};

export default AnimatedCircle;
