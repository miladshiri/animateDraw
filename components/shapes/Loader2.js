import React from "react";
import { motion } from "framer-motion";
import { defaultSettings } from "../shapeToComponentMapping";

const Loader2 = ({ size, shapeSettings }) => {
  const dotSize = Math.min(size.w, size.h) / 20;
  const loaderSize = Math.min(size.w, size.h) / 2;
  
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

  const shapeColor = shapeSettings?.shapeColor || defaultSettings['Loader2']?.shapeColor || "#ffffff";
  const borderColor = shapeSettings?.borderColor || defaultSettings['Loader2']?.borderColor || "rgba(255, 255, 255, 0.3)";

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
          height: "1px",
          backgroundColor: borderColor,
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
            top: -dotSize/2 + 1,
            left: -dotSize/2,
          }}
          animate={{
            x: [0, loaderSize + dotSize/2],
          }}
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
            top: -dotSize/2 + 1,
            left: -dotSize/2,
          }}
          animate={{
            x: [0, loaderSize + dotSize/2],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: -speed/2,
          }}
        />
      </div>
    </div>
  );
};

export default Loader2; 