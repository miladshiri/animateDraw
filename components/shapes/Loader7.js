import React from "react";
import { motion } from "framer-motion";
import { defaultSettings } from "../shapeToComponentMapping";

const Loader7 = ({ size, shapeSettings }) => {
  // Add safety checks for size values
  const safeWidth = size?.w || 100; // Default to 100 if undefined
  const safeHeight = size?.h || 100; // Default to 100 if undefined
  
  const loaderSize = Math.min(safeWidth, safeHeight);
  const waveCount = 3;
  
  var speed = 0.8;
  if (shapeSettings) {
    if (shapeSettings.animationSpeed === 'slow') {
      speed = 1.6;
    } else if (shapeSettings.animationSpeed === 'normal') {
      speed = 0.8;
    } else if (shapeSettings.animationSpeed === 'fast') {
      speed = 0.4;
    }
  }

  const shapeColor = shapeSettings?.shapeColor || defaultSettings['Loader7']?.shapeColor || "#ffffff";

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
        {[...Array(waveCount)].map((_, index) => (
          <motion.div
            key={`wave-${index}-${speed}`}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              border: "2px solid currentColor",
              borderRadius: "50%",
              opacity: 0.6,
            }}
            animate={{
              scale: [0.2, 1],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: "easeOut",
              delay: index * (speed / waveCount),
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Loader7; 