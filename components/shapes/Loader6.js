import React from "react";
import { motion } from "framer-motion";
import { defaultSettings } from "../shapeToComponentMapping";

const Loader6 = ({ size, shapeSettings }) => {
  // Add safety checks for size values
  const safeWidth = size?.w || 100; // Default to 100 if undefined
  const safeHeight = size?.h || 100; // Default to 100 if undefined
  
  const loaderSize = Math.min(safeWidth, safeHeight) / 2;
  const ballSize = loaderSize / 4;
  
  var speed = 0.6;
  if (shapeSettings) {
    if (shapeSettings.animationSpeed === 'slow') {
      speed = 1.2;
    } else if (shapeSettings.animationSpeed === 'normal') {
      speed = 0.6;
    } else if (shapeSettings.animationSpeed === 'fast') {
      speed = 0.3;
    }
  }

  const shapeColor = shapeSettings?.shapeColor || defaultSettings['Loader6']?.shapeColor || "#ffffff";

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
        style={{
          width: loaderSize,
          height: loaderSize,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.div
          style={{
            width: ballSize,
            height: ballSize,
            borderRadius: "50%",
            backgroundColor: "currentColor",
            position: "absolute",
          }}
          animate={{
            y: [-loaderSize/2, loaderSize/2],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          style={{
            width: ballSize,
            height: ballSize,
            borderRadius: "50%",
            backgroundColor: "currentColor",
            position: "absolute",
          }}
          animate={{
            y: [-loaderSize/2, loaderSize/2],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: -speed/2,
          }}
        />
      </motion.div>
    </div>
  );
};

export default Loader6; 