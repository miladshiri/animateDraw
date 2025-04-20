import { useState, useEffect, useId } from "react";
import { defaultSettings } from "../shapeToComponentMapping";

const DanceShape = ({ size, shapeSettings, scale }) => {
  const uniqueId = useId().replace(/:/g, ''); // Remove colons from the ID
  var speed = 4;

  if (shapeSettings) {
    if (shapeSettings.animationSpeed == 'slow') {
      speed = 8;
    }
    else if (shapeSettings.animationSpeed == 'normal') {
      speed = 4;
    }
    else if (shapeSettings.animationSpeed == 'fast') {
      speed = 2;
    }
  }

  // Calculate base unit based on size
  const baseUnit = Math.min(size.w, size.h) / 200; // 200 is our base unit for calculations
  
  // Get colors from settings or use defaults
  const shapeColor = shapeSettings ? (shapeSettings.shapeColor ? shapeSettings.shapeColor : defaultSettings['DanceShape'].shapeColor) : defaultSettings['DanceShape'].shapeColor;

  return (
    <div style={{ 
      width: `${baseUnit * 200}px`,
      height: `${baseUnit * 200}px`,
      backgroundColor: shapeColor,
      animation: `squareToCircle${uniqueId} ${speed * 1000}ms infinite alternate`,
      WebkitAnimation: `squareToCircle${uniqueId} ${speed * 1000}ms infinite alternate`
    }}>
      <style jsx>
      {`
        @keyframes squareToCircle${uniqueId} {
          0% {
            border-radius: 0;
            transform: rotate(0deg);
          }
          25% {
            border-radius: 50% 0 0 0;
            transform: rotate(45deg);
          }
          50% {
            border-radius: 50% 50% 0 0;
            transform: rotate(90deg);
          }
          75% {
            border-radius: 50% 50% 50% 0;
            transform: rotate(135deg);
          }
          100% {
            border-radius: 50%;
            transform: rotate(180deg);
          }
        }
        @-webkit-keyframes squareToCircle${uniqueId} {
          0% {
            border-radius: 0;
            transform: rotate(0deg);
          }
          25% {
            border-radius: 50% 0 0 0;
            transform: rotate(45deg);
          }
          50% {
            border-radius: 50% 50% 0 0;
            transform: rotate(90deg);
          }
          75% {
            border-radius: 50% 50% 50% 0;
            transform: rotate(135deg);
          }
          100% {
            border-radius: 50%;
            transform: rotate(180deg);
          }
        }
      `}
      </style>
    </div>
  )
}

export default DanceShape; 