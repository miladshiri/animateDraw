"use client";
import { motion } from "framer-motion";

import React, { useState, useEffect } from "react";

const AnimatedRec = ({size, scale}) => {

  return (
    <div
      style={{
        backgroundColor: "red",
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
          width: `${Math.max(size.w, size.h) * scale * 2}px`, 
          height: `${Math.min(size.w, size.h) * scale / 1.6}px`,
          background: "#4caf50",
          transform: "translate(-50%, -50%) rotate(45deg)",
          animation: "rotateAround 4s linear infinite",

        }}
      >
      </div>
      <div
        style={{
          position: "absolute",
          inset: `${5 * scale}px`,
          background: "#2a2a2a"

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
