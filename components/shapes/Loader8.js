import React from "react";
import { motion } from "framer-motion";
import { defaultSettings } from "../shapeToComponentMapping";

const Loader8 = ({ size, shapeSettings }) => {
  const loaderSize = Math.min(size.w, size.h) / 2;
  const cubeSize = loaderSize / 2;
  
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

  const shapeColor = shapeSettings?.shapeColor || defaultSettings['Loader8']?.shapeColor || "#ffffff";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        perspective: "1000px",
        color: shapeColor,
      }}
    >
      <motion.div
        key={`container-${speed}`}
        style={{
          width: cubeSize,
          height: cubeSize,
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
            transform: `translateZ(${cubeSize/2}px)`,
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
            transform: `translateZ(-${cubeSize/2}px)`,
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
            transform: `rotateY(-90deg) translateZ(${cubeSize/2}px)`,
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
            transform: `rotateY(90deg) translateZ(${cubeSize/2}px)`,
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
            transform: `rotateX(90deg) translateZ(${cubeSize/2}px)`,
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
            transform: `rotateX(-90deg) translateZ(${cubeSize/2}px)`,
          }}
        />
      </motion.div>
    </div>
  );
};

export default Loader8; 