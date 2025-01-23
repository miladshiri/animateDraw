"use client";

import React, { useState, useEffect } from "react";

const AnimatedRec = ({initialSize, scale, initialPosition, position}) => {
  return (
    <div
      style={{
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
        {/* Animated Circle */}
        <div
          style={{
            position: "absolute",
            top: `${-10 * scale}px`, // Scaled position
            left: `${-10 * scale}px`, // Scaled position
            width: `${10 * scale}px`, // Scaled circle size
            height: `${10 * scale}px`, // Scaled circle size
            backgroundColor: "#aaaaaa",
            animation: `moveAlongBorder ${5 / scale}s linear infinite`, // Adjust speed based on scale
          }}
        ></div>
      </>

      {/* CSS keyframe animation */}
      <style jsx>{`
        @keyframes moveAlongBorder {
          0% {
            top: ${-10 * scale}px;
            left: ${-10 * scale}px;
          }
          25% {
            top: ${-10 * scale}px;
            left: ${(initialSize.h) * scale}px; /* Scaled top-right corner */
          }
          50% {
            top: ${(initialSize.w) * scale}px; /* Scaled bottom-right corner */
            left: ${(initialSize.h) * scale}px;
          }
          75% {
            top: ${(initialSize.w) * scale}px; /* Scaled bottom-left corner */
            left: ${-10 * scale}px;
          }
          100% {
            top: ${-10 * scale}px; /* Back to the top-left corner */
            left: ${-10 * scale}px;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedRec;
