"use client";
import { motion } from "framer-motion";

import React, { useState, useEffect } from "react";

const AnimatedRec = ({initialSize, scale, initialPosition, position}) => {
  const path = [
    { x: -10 * scale, y: -10 * scale }, // Top-left corner
    { x: (initialSize.w - 20) * scale, y: -10 * scale }, // Top-right corner
    { x: (initialSize.w - 20) * scale, y: (initialSize.h - 20) * scale }, // Bottom-right corner
    { x: -10 * scale, y: (initialSize.h - 20) * scale }, // Bottom-left corner
    { x: -10 * scale, y: -10 * scale }, // Back to top-left
  ];

  return (
    <div
      style={{
        backgroundColor: "red",
        position: "absolute",
        top: `${(position.y  + initialPosition.y) * scale}px`, // Apply drag position
        left: `${(position.x + initialPosition.x) * scale}px`, // Apply drag position
        width: `${initialSize.w * scale}px`, // Scaled width
        height: `${initialSize.h * scale}px`, // Scaled height
        border: `${10 * scale}px solid rgb(66, 5, 48)`, // Scaled border
        userSelect: "none", // Prevent text selection while dragging
      }}
    >
      <>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${10 * scale}px`, // Scaled circle size
          height: `${10 * scale}px`, // Scaled circle size
          backgroundColor: "#aaaaaa",
          borderRadius: "50%", // To make it a circle
        }}
        animate={{
          x: path.map((point) => point.x),
          y: path.map((point) => point.y),
        }}
        transition={{
          repeat: Infinity,
          duration: 5 / scale, // Speed adjusted by scale
          ease: "linear",
        }}
      />
      </>
    </div>
  );
};

export default AnimatedRec;
