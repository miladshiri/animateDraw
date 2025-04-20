"use client";
import React from "react";
import { motion } from "framer-motion";
import { defaultSettings } from "../shapeToComponentMapping";

const GradientCircle = ({ size, shapeSettings }) => {
  const circleSize = Math.min(size.w, size.h);
  const borderWidth = circleSize / 100;
  
  var speed = 3;
  if (shapeSettings) {
    if (shapeSettings.animationSpeed == 'slow') {
      speed = 6;
    }
    else if (shapeSettings.animationSpeed == 'normal') {
      speed = 3;
    }
    else if (shapeSettings.animationSpeed == 'fast') {
      speed = 1.5;
    }
    else {
      speed = 0;
    }
  }

  return (
    <div
      style={{
        position: "relative",
        top: "0px",
        left: "0px",
        width: `${circleSize}px`,
        height: `${circleSize}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: `${shapeSettings ? (shapeSettings.shapeColor ? shapeSettings.shapeColor : defaultSettings['GradientCircle'].shapeColor) : defaultSettings['GradientCircle'].shapeColor}`,
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {speed > 0 && (
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "50%",
            border: `${borderWidth}px solid transparent`,
            background: "linear-gradient(270deg, #ff6ec4, #7873f5, #4facfe)",
            backgroundSize: "600% 600%",
            WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </div>
  );
};

export default GradientCircle; 