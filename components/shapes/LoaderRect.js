import React from "react";
import { motion } from "framer-motion";
import { defaultSettings } from "../shapeToComponentMapping";

const LoaderRect = ({ size, shapeSettings }) => {
  // Add safety checks for size values
  const safeWidth = size?.w || 100; // Default to 100 if undefined
  const safeHeight = size?.h || 100; // Default to 100 if undefined
  
  const dotSize = Math.min(safeWidth, safeHeight) / 20;
  const loaderSize = { width: safeWidth, height: safeHeight };
  const borderWidth = 1; // Border width in pixels
  const loaderDistX = safeWidth - dotSize/2;
  const loaderDistY = safeHeight - dotSize/2;
  
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

  const flowColor = shapeSettings?.flowColor || defaultSettings['LoaderRect']?.flowColor || "#ffffff";
  const borderColor = shapeSettings?.borderColor || defaultSettings['LoaderRect']?.borderColor || "rgba(255, 255, 255, 0.3)";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        color: flowColor,
      }}
    >
      <div
        style={{
          width: loaderSize.width,
          height: loaderSize.height,
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
            x: [0, loaderDistX + dotSize/2, loaderDistX + dotSize/2, 0, 0],
            y: [0, 0, loaderDistY + dotSize/2, loaderDistY + dotSize/2, 0],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.25, 0.5, 0.75, 1],
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
            x: [0, loaderDistX + dotSize/2, loaderDistX + dotSize/2, 0, 0],
            y: [0, 0, loaderDistY + dotSize/2, loaderDistY + dotSize/2, 0],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.25, 0.5, 0.75, 1],
            delay: -speed/2,
          }}
        />
      </div>
    </div>
  );
};

export default LoaderRect;