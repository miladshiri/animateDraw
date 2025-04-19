import React from "react";
import { motion } from "framer-motion";
import { defaultSettings } from "../shapeToComponentMapping";

const Loader3 = ({ size, shapeSettings }) => {
  // Add safety checks for size values
  const safeWidth = size?.w || 100; // Default to 100 if undefined
  const safeHeight = size?.h || 100; // Default to 100 if undefined
  
  const dotSize = Math.min(safeWidth, safeHeight) / 20;
  const loaderSize = Math.min(safeWidth, safeHeight) / 2;
  
  var speed = 1.2;
  if (shapeSettings) {
    if (shapeSettings.animationSpeed === 'slow') {
      speed = 2.4;
    } else if (shapeSettings.animationSpeed === 'normal') {
      speed = 1.2;
    } else if (shapeSettings.animationSpeed === 'fast') {
      speed = 0.6;
    }
  }

  const shapeColor = shapeSettings?.shapeColor || defaultSettings['Loader3']?.shapeColor || "#ffffff";
  const borderColor = shapeSettings?.borderColor || defaultSettings['Loader3']?.borderColor || "rgba(255, 255, 255, 0.3)";

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
        key={`outer-${speed}`}
        style={{
          width: loaderSize,
          height: loaderSize,
          aspectRatio: "1 / 1",
          border: `1px solid ${borderColor}`,
          borderRadius: "50%",
          position: "relative",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: speed * 3,
          repeat: Infinity,
          ease: "linear",
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
            left: `calc(50% - ${dotSize/2}px)`,
            transformOrigin: `center ${loaderSize/2 + dotSize/2 - 1}px`,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "easeInOut",
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
            left: `calc(50% - ${dotSize/2}px)`,
            transformOrigin: `center ${loaderSize/2 + dotSize/2 - 1}px`,
          }}
          animate={{ rotate: 360 }}
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

export default Loader3; 