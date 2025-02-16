"use client";
import { motion } from "framer-motion";

import React, { useState, useEffect } from "react";

const AnimatedRec = ({size, shapeSettings}) => {

  return (
    <div
      style={{
        backgroundColor: `${shapeSettings ? (shapeSettings.borderColor ? shapeSettings.borderColor : "#51b39a") : "#51b39a"}`,
        position: "relative",
        top: `0px`, 
        left: `0px`,
        width: `100%`,
        height: `100%`,
        textAlign: 'center',
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      <>
      <div
        style={{
          top: "50%",
          left: "50%",
          position: "absolute",
          content: "",
          width: `${Math.max(size.w, size.h) * 2}px`, 
          height: `${Math.min(size.w, size.h) / 1.6}px`,
          background: `${shapeSettings ? (shapeSettings.flowColor ? shapeSettings.flowColor : "#51b39a") : "#51b39a"}`,
          transform: "translate(-50%, -50%) rotate(45deg)",
          animation: "rotateAround 4s linear infinite",
        }}
      >
      </div>
      <div
        style={{
          position: "absolute",
          inset: `${5}%`,
          background:  `${shapeSettings ? (shapeSettings.shapeColor ? shapeSettings.shapeColor : "#2a2a2a") : "#2a2a2a"}`

        }}  
      >

      </div>
      </>

      {/* CSS keyframe animation */}
      <style jsx>{`
        @keyframes rotateAround {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>

    </div>
  );
};

export default AnimatedRec;
