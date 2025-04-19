import React from "react";
import { motion } from "framer-motion";
import { defaultSettings } from "../shapeToComponentMapping";

const Loader1 = ({ size, shapeSettings }) => {
  // Add safety checks for size values
  const safeWidth = size?.w || 100; // Default to 100 if undefined
  const safeHeight = size?.h || 100; // Default to 100 if undefined
  
  const dotSize = Math.min(safeWidth, safeHeight) / 20;
  const loaderSize = Math.min(safeWidth, safeHeight) / 2;
  const loaderDist = loaderSize - dotSize/2 + 1;
  
  var speed = 1;
  if (shapeSettings) {
    if (shapeSettings.animationSpeed === 'slow') {
      speed = 2;
    } else if (shapeSettings.animationSpeed === 'normal') {
      speed = 1;
    } else if (shapeSettings.animationSpeed === 'fast') {
      speed = 0.5;
    }
  }

  const shapeColor = shapeSettings?.shapeColor || defaultSettings['Loader1']?.shapeColor || "#ffffff";
  const borderColor = shapeSettings?.borderColor || defaultSettings['Loader1']?.borderColor || "rgba(255, 255, 255, 0.3)";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        color: shapeColor,
      }}
    >
      <div
        style={{
          width: loaderSize,
          height: loaderSize,
          aspectRatio: "1 / 1",
          border: `1px solid ${borderColor}`,
          position: "relative",
        }}
      >
        <motion.div
          key={`dot1-${speed}`}
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: "currentColor",
            borderRadius: "50%",
            position: "absolute",
            top: -dotSize/2,
            left: -dotSize/2,
          }}
          animate={{
            x: [0, loaderDist, loaderDist, 0],
            y: [0, 0, loaderDist, loaderDist],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 1],
          }}
        />
        <motion.div
          key={`dot2-${speed}`}
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: "currentColor",
            borderRadius: "50%",
            position: "absolute",
            top: -dotSize/2,
            left: -dotSize/2,
          }}
          animate={{
            x: [0, loaderDist, loaderDist, 0],
            y: [0, 0, loaderDist, loaderDist],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 1],
            delay: -speed/2,
          }}
        />
      </div>
    </div>
  );
};

export default Loader1;