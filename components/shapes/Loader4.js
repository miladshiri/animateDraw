import React from "react";
import { motion } from "framer-motion";
import { defaultSettings } from "../shapeToComponentMapping";

const Loader4 = ({ size, shapeSettings }) => {
  const loaderSize = Math.min(size.w, size.h) / 2;
  const zOffset = loaderSize / 4;
  
  var speed = 0.5;
  if (shapeSettings) {
    if (shapeSettings.animationSpeed === 'slow') {
      speed = 1;
    } else if (shapeSettings.animationSpeed === 'normal') {
      speed = 0.5;
    } else if (shapeSettings.animationSpeed === 'fast') {
      speed = 0.25;
    }
  }

  const shapeColor = shapeSettings?.shapeColor || defaultSettings['Loader4']?.shapeColor || "#ffffff";

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
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Front face */}
        <motion.div
          key={`face1-${speed}`}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "currentColor",
            opacity: 0.8,
            transform: `translateZ(${zOffset}px)`,
          }}
        />
        {/* Back face */}
        <motion.div
          key={`face2-${speed}`}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "currentColor",
            opacity: 0.8,
            transform: `translateZ(-${zOffset}px)`,
          }}
        />
        {/* Left face */}
        <motion.div
          key={`face3-${speed}`}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "currentColor",
            opacity: 0.6,
            transform: `rotateY(-90deg) translateZ(${zOffset}px)`,
          }}
        />
        {/* Right face */}
        <motion.div
          key={`face4-${speed}`}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "currentColor",
            opacity: 0.6,
            transform: `rotateY(90deg) translateZ(${zOffset}px)`,
          }}
        />
        {/* Top face */}
        <motion.div
          key={`face5-${speed}`}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "currentColor",
            opacity: 0.4,
            transform: `rotateX(90deg) translateZ(${zOffset}px)`,
          }}
        />
        {/* Bottom face */}
        <motion.div
          key={`face6-${speed}`}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "currentColor",
            opacity: 0.4,
            transform: `rotateX(-90deg) translateZ(${zOffset}px)`,
          }}
        />
      </motion.div>
    </div>
  );
};

export default Loader4; 