import React from "react";
import { motion } from "framer-motion";
import { defaultSettings } from "../shapeToComponentMapping";

const Loader9 = ({ size, shapeSettings }) => {
  // Add safety checks for size values
  const safeWidth = size?.w || 100; // Default to 100 if undefined
  const safeHeight = size?.h || 100; // Default to 100 if undefined
  
  const loaderSize = Math.min(safeWidth, safeHeight) / 2;
  const dotCount = 8;
  const dotSize = loaderSize / 10;
  
  var speed = 1.5;
  if (shapeSettings) {
    if (shapeSettings.animationSpeed === 'slow') {
      speed = 3;
    } else if (shapeSettings.animationSpeed === 'normal') {
      speed = 1.5;
    } else if (shapeSettings.animationSpeed === 'fast') {
      speed = 0.75;
    }
  }

  const shapeColor = shapeSettings?.shapeColor || defaultSettings['Loader9']?.shapeColor || "#ffffff";

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
      <motion.div
        key={`container-${speed}`}
        style={{
          width: loaderSize,
          height: loaderSize,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Left helix */}
        {[...Array(dotCount)].map((_, index) => (
          <motion.div
            key={`left-${index}-${speed}`}
            style={{
              position: "absolute",
              width: dotSize,
              height: dotSize,
              borderRadius: "50%",
              backgroundColor: "currentColor",
              left: `calc(50% - ${loaderSize/4}px)`,
            }}
            animate={{
              y: [
                -loaderSize/2,
                0,
                loaderSize/2,
                0,
                -loaderSize/2
              ],
              scale: [0.8, 1, 0.8, 1, 0.8],
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * (speed / dotCount),
            }}
          />
        ))}
        {/* Right helix */}
        {[...Array(dotCount)].map((_, index) => (
          <motion.div
            key={`right-${index}-${speed}`}
            style={{
              position: "absolute",
              width: dotSize,
              height: dotSize,
              borderRadius: "50%",
              backgroundColor: "currentColor",
              right: `calc(50% - ${loaderSize/4}px)`,
            }}
            animate={{
              y: [
                0,
                loaderSize/2,
                0,
                -loaderSize/2,
                0
              ],
              scale: [1, 0.8, 1, 0.8, 1],
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * (speed / dotCount),
            }}
          />
        ))}
        {/* Connecting lines */}
        {[...Array(dotCount)].map((_, index) => (
          <motion.div
            key={`line-${index}-${speed}`}
            style={{
              position: "absolute",
              width: loaderSize/2,
              height: "2px",
              backgroundColor: "currentColor",
              opacity: 0.3,
              top: `calc(50% - ${(loaderSize/2) * (index/dotCount)}px)`,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * (speed / dotCount),
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Loader9; 