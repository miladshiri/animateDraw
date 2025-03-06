"use client";
import { motion } from "framer-motion";
import React from "react";
import { defaultSettings } from "../shapeToComponentMapping";

const AnimatedRedCircle = ({size, shapeSettings}) => {
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

  const circleSize = Math.min(size.w, size.h);
  const borderWidth = circleSize / 20;
  
  // Get colors from shapeSettings or use defaults
  const mainColor = shapeSettings?.shapeColor || defaultSettings['AnimatedRedCircle'].shapeColor || "#ff0000";
  const borderColor = shapeSettings?.borderColor || defaultSettings['AnimatedRedCircle'].borderColor || "#ff0000";

  return (
    <div
      style={{
        backgroundColor: "transparent",
        position: "relative",
        width: `${circleSize}px`,
        height: `${circleSize}px`,
        userSelect: "none",
        overflow: "visible",
      }}
    >
      {speed > 0 && (
        <>
          {/* Main circle */}
          <motion.div
            key={`main-${speed}`}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: mainColor,
              borderRadius: "50%",
            }}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [1, 0.9, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: speed,
              ease: "easeInOut",
            }}
          />
          {/* Blast effect */}
          <motion.div
            key={`blast-${speed}`}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              border: `${borderWidth}px solid ${borderColor}`,
              borderRadius: "50%",
            }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [1, 0, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: speed,
              ease: "easeOut",
            }}
          />
        </>
      )}
    </div>
  );
};

export default AnimatedRedCircle; 