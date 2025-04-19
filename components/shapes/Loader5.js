import React from "react";
import { motion } from "framer-motion";
import { defaultSettings } from "../shapeToComponentMapping";

const Loader5 = ({ size, shapeSettings }) => {
  const loaderSize = Math.min(size.w, size.h) / 2;
  const tiltDeg = 40;
  const zOffset = loaderSize / 4;
  
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

  const shapeColor = shapeSettings?.shapeColor || defaultSettings['Loader5']?.shapeColor || "#ffffff";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        color: shapeColor,
        perspective: loaderSize * 2,
      }}
    >
      <motion.div
        key={`container-${speed}`}
        style={{
          width: loaderSize,
          height: loaderSize,
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          key={`triangle1-${speed}`}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderLeft: `${loaderSize/2}px solid transparent`,
            borderRight: `${loaderSize/2}px solid transparent`,
            borderBottom: `${loaderSize}px solid currentColor`,
            transformOrigin: "50% 100%",
            transform: `rotateX(${tiltDeg}deg) translateZ(${zOffset}px)`,
          }}
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          key={`triangle2-${speed}`}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderLeft: `${loaderSize/2}px solid transparent`,
            borderRight: `${loaderSize/2}px solid transparent`,
            borderBottom: `${loaderSize}px solid currentColor`,
            transformOrigin: "50% 100%",
            transform: `rotateX(${tiltDeg}deg) translateZ(${-zOffset}px)`,
            opacity: 0.5,
          }}
          animate={{
            rotateY: [180, 540],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  );
};

export default Loader5; 