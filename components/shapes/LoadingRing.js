"use client";
import React from "react";
import { motion } from "framer-motion";
import { defaultSettings } from "../shapeToComponentMapping";

const LoadingRing = ({ size, shapeSettings }) => {
  // Add safety checks for size values
  const safeWidth = size?.w || 100; // Default to 100 if undefined
  const safeHeight = size?.h || 100; // Default to 100 if undefined
  
  const circleSize = Math.min(safeWidth, safeHeight);
  const borderWidth = circleSize / 100;
  const dotSize = circleSize / 12;
  
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

  const flowColor = shapeSettings?.flowColor || defaultSettings['LoadingRing']?.flowColor || "#fff000";
  const borderColor = shapeSettings?.borderColor || defaultSettings['LoadingRing']?.borderColor || "#3c3c3c";

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
          position: "relative",
          width: circleSize,
          height: circleSize,
          background: "transparent",
          border: `${borderWidth}px solid ${borderColor}`,
          borderRadius: "50%",
          boxShadow: `0 0 ${borderWidth * 5}px rgba(0,0,0,0.5)`,
        }}
      >
        <motion.div
          key={`ring-${speed}`}
          style={{
            position: "absolute",
            top: `-${borderWidth}px`,
            left: `-${borderWidth}px`,
            width: "100%",
            height: "100%",
            borderTop: `${borderWidth}px solid currentColor`,
            borderRight: `${borderWidth}px solid currentColor`,
            borderRadius: "50%",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          key={`arm-${speed}`}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "50%",
            height: `${borderWidth * 2}px`,
            background: "transparent",
            transformOrigin: "left",
            transform: "translate(-50%, -50%) rotate(45deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              borderRadius: "50%",
              backgroundColor: "currentColor",
              top: `-${dotSize/2}px`,
              right: `-${dotSize/2}px`,
              transform: " rotate(45deg)",
              boxShadow: `0 0 ${dotSize}px currentColor`,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingRing;