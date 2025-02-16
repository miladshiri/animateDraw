"use client";
import { motion } from "framer-motion";

import React, { useState, useEffect } from "react";
import { defaultSettings } from "../shapeToComponentMapping";

const AnimatedRecRotate = ({size, shapeSettings}) => {
  
  var speed = 1;
  if (shapeSettings) {
    if (shapeSettings.animationSpeed == 'slow') {
      speed = 5;
    }
    else if (shapeSettings.animationSpeed == 'normal') {
      speed = 2;
    }
    else if (shapeSettings.animationSpeed == 'fast') {
      speed = 1;
    }
    else {
      speed = 0;
    }
  }


  return (
    <div
      style={{
        backgroundColor: `${shapeSettings ? (shapeSettings.borderColor ? shapeSettings.borderColor : defaultSettings['AnimatedRecRotate'].borderColor) : defaultSettings['AnimatedRecRotate'].borderColor}`,
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
          background: `${shapeSettings ? (shapeSettings.flowColor ? shapeSettings.flowColor : defaultSettings['AnimatedRecRotate'].flowColor) : defaultSettings['AnimatedRecRotate'].flowColor}`,
          transform: "translate(-50%, -50%) rotate(45deg)",
          animation: `rotateAround ${speed}s linear infinite`,
        }}
      >
      </div>
      <div
        style={{
          position: "absolute",
          inset: `${5}%`,
          background:  `${shapeSettings ? (shapeSettings.shapeColor ? shapeSettings.shapeColor : defaultSettings['AnimatedRecRotate'].shapeColor) : defaultSettings['AnimatedRecRotate'].shapeColor}`

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

export default AnimatedRecRotate;
