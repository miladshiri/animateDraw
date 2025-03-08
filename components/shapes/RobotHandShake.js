import { useState, useEffect, useId } from "react";
import { defaultSettings } from "../shapeToComponentMapping";

const RobotHandShake = ({ size, shapeSettings, scale }) => {
  const [isHovered, setIsHovered] = useState(false);
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
  const baseUnit = Math.min(size.w, size.h) / 40; // 40 is our base unit for calculations
  
  // Get colors from settings or use defaults
  const shapeColor = shapeSettings ? (shapeSettings.shapeColor ? shapeSettings.shapeColor : defaultSettings['RobotHandShake'].shapeColor) : defaultSettings['RobotHandShake'].shapeColor;
  const flowColor = shapeSettings ? (shapeSettings.flowColor ? shapeSettings.flowColor : defaultSettings['RobotHandShake'].flowColor) : defaultSettings['RobotHandShake'].flowColor;

  return (
    <div style={{ padding: `${baseUnit * 5}px` }}>
      <div className="robot" style={{
        display: 'block',
        position: 'relative',
        animation: `hover ${speed * 375}ms ease-in-out alternate infinite`
      }}>
        <div className="robot-head"></div>
        <div 
          className="robot-body" 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ 
            width: `${baseUnit * 20}px`,
            height: `${baseUnit * 22.5}px`,
            position: 'absolute',
            top: `${baseUnit * 15}px`,
            left: `${baseUnit * 2.5}px`,
            display: 'block',
            overflow: 'hidden',
            borderRadius: '50% 50% 50% 50%/30% 30% 70% 70%',
            background: shapeColor,
          }}
        >
          <div 
            style={{
              content: '""',
              display: 'block',
              width: `${baseUnit * 3.75}px`,
              height: `${baseUnit * 3.75}px`,
              position: 'absolute',
              top: `${baseUnit * 6.25}px`,
              left: `${baseUnit * 12}px`,
              borderRadius: '50%',
              animation: isHovered 
                ? `wobble${uniqueId} ${speed * 25}ms linear infinite`
                : `beat${uniqueId} ${speed * 112}ms linear infinite`,
              backgroundColor: flowColor
            }}
          />
        </div>
        <div className="robot-hand" style={{
          width: `${baseUnit * 8.5}px`,
          height: `${baseUnit * 8.5}px`,
          position: 'absolute',
          top: `${baseUnit * 7.5}px`,
          left: `${baseUnit * 21.25}px`,
          display: 'block',
          borderRadius: '50%',
          transformOrigin: `50% ${baseUnit * 12}px`,
          boxShadow: `0 ${baseUnit * 7.5}px 0 ${-baseUnit * 2.5}px ${shapeColor}`,
          animation: `wave ${speed * 250}ms alternate ease-in-out infinite`
        }}></div>
        <div style={{
          content: '""',
          display: 'block',
          width: `${baseUnit * 15}px`,
          height: `${baseUnit * 3.75}px`,
          position: 'absolute',
          top: `${baseUnit * 40}px`,
          left: `${baseUnit * 5}px`,
          borderRadius: '50%',
          animation: `shadow ${speed * 375}ms ease-in-out alternate infinite`
        }}></div>
      </div>

      <style jsx>
      {`
        @-webkit-keyframes shadow {
          from {
            transform: translate(0, ${-baseUnit * 1.25}px) scale(1, 1);
            background-color: rgba(0, 0, 0, 0.1);
          }
          to {
            transform: translate(0, 0) scale(1.3, 1);
            background-color: rgba(0, 0, 0, 0.05);
          }
        }
        @keyframes shadow {
          from {
            transform: translate(0, ${-baseUnit * 1.25}px) scale(1, 1);
            background-color: rgba(0, 0, 0, 0.1);
          }
          to {
            transform: translate(0, 0) scale(1.3, 1);
            background-color: rgba(0, 0, 0, 0.05);
          }
        }
        @-webkit-keyframes hover {
          from {
            transform: translate(0, 0);
          }
          to {
            transform: translate(0, ${-baseUnit * 1.25}px);
          }
        }
        @keyframes hover {
          from {
            transform: translate(0, 0);
          }
          to {
            transform: translate(0, ${-baseUnit * 1.25}px);
          }
        }
        @-webkit-keyframes beat${uniqueId} {
          0% {
            background-color: ${flowColor};
            box-shadow: 0 0 0 0 ${flowColor}4D;
          }
          50%, 70% {
            background-color: ${flowColor};
            box-shadow: 0 0 ${baseUnit * 10}px ${baseUnit * 12.5}px ${flowColor}00;
          }
          100% {
            background-color: ${flowColor};
          }
        }
        @keyframes beat${uniqueId} {
          0% {
            background-color: ${flowColor};
            box-shadow: 0 0 0 0 ${flowColor}4D;
          }
          50%, 70% {
            background-color: ${flowColor};
            box-shadow: 0 0 ${baseUnit * 10}px ${baseUnit * 12.5}px ${flowColor}00;
          }
          100% {
            background-color: ${flowColor};
          }
        }
        @-webkit-keyframes wave {
          from {
            transform: rotate(15deg);
          }
          to {
            transform: rotate(80deg);
          }
        }
        @keyframes wave {
          from {
            transform: rotate(15deg);
          }
          to {
            transform: rotate(80deg);
          }
        }
        @-webkit-keyframes wobble${uniqueId} {
          0% {
            transform: translate(${-baseUnit * 0.25}px, 0);
            background-color: ${flowColor};
            box-shadow: 0 0 0 0 ${flowColor}4D;
          }
          50%, 70% {
            transform: translate(${baseUnit * 0.25}px, 0);
            background-color: ${flowColor};
            box-shadow: 0 0 ${baseUnit * 10}px ${baseUnit * 12.5}px ${flowColor}00;
          }
          100% {
            transform: translate(${-baseUnit * 0.25}px, 0);
            background-color: ${flowColor};
          }
        }
        @keyframes wobble${uniqueId} {
          0% {
            transform: translate(${-baseUnit * 0.25}px, 0);
            background-color: ${flowColor};
            box-shadow: 0 0 0 0 ${flowColor}4D;
          }
          50%, 70% {
            transform: translate(${baseUnit * 0.25}px, 0);
            background-color: ${flowColor};
            box-shadow: 0 0 ${baseUnit * 10}px ${baseUnit * 12.5}px ${flowColor}00;
          }
          100% {
            transform: translate(${-baseUnit * 0.25}px, 0);
            background-color: ${flowColor};
          }
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .robot-head {
          width: ${baseUnit * 25}px;
          height: ${baseUnit * 12.5}px;
          display: block;
          position: relative;
          border-radius: ${baseUnit * 6.25}px;
          background-color: black;
          box-shadow: 0 0 0 ${baseUnit * 3.25}px ${shapeColor} inset;
          transition: transform ease-in-out ${speed * 87.5}ms;
        }
        .robot-head::before {
          content: "";
          display: block;
          width: ${baseUnit * 4}px;
          height: ${baseUnit * 4}px;
          position: absolute;
          top: ${-baseUnit * 10}px;
          left: ${baseUnit * 10.5}px;
          border-radius: 50%;
          background-color: ${shapeColor};
          box-shadow: 0 ${baseUnit}px 0 ${-baseUnit * 1.5}px ${shapeColor}, 0 ${baseUnit * 0.5}px 0 ${-baseUnit * 1.5}px ${shapeColor}, 0 ${baseUnit}px 0 ${-baseUnit * 1.5}px ${shapeColor}, 0 ${baseUnit * 1.5}px 0 ${-baseUnit * 1.5}px ${shapeColor}, 0 ${baseUnit * 2}px 0 ${-baseUnit * 1.5}px ${shapeColor}, 0 ${baseUnit * 2.5}px 0 ${-baseUnit * 1.5}px ${shapeColor}, 0 ${baseUnit * 3}px 0 ${-baseUnit * 1.5}px ${shapeColor}, 0 ${baseUnit * 3.5}px 0 ${-baseUnit * 1.5}px ${shapeColor}, 0 ${baseUnit * 4}px 0 ${-baseUnit * 1.5}px ${shapeColor}, 0 ${baseUnit * 4.5}px 0 ${-baseUnit * 1.5}px ${shapeColor}, 0 ${baseUnit * 5}px 0 ${-baseUnit * 1.5}px ${shapeColor}, 0 ${baseUnit * 5.5}px 0 ${-baseUnit * 1.5}px ${shapeColor}, 0 ${baseUnit * 6}px 0 ${-baseUnit * 1.5}px ${shapeColor}, 0 ${baseUnit * 6.5}px 0 ${-baseUnit * 1.5}px ${shapeColor}, 0 ${baseUnit * 7}px 0 ${-baseUnit * 1.5}px ${shapeColor}, 0 ${baseUnit * 7.5}px 0 ${-baseUnit * 1.5}px ${shapeColor}, 0 ${baseUnit * 8}px 0 ${-baseUnit * 1.5}px ${shapeColor};
        }
        .robot-head::after {
          content: "";
          display: block;
          width: ${baseUnit * 3.75}px;
          height: ${baseUnit * 3.75}px;
          position: absolute;
          top: ${baseUnit * 4.5}px;
          left: ${baseUnit * 4.5}px;
          border-radius: ${baseUnit * 1.875}px;
          background-color: ${flowColor};
          box-shadow: ${baseUnit * 12.25}px 0 ${flowColor};
          transition: inherit;
        }
        .robot-head:hover {
          transform: rotate(15deg) translate(${baseUnit * 2.5}px, 0);
        }
        .robot-head:hover::after {
          transform: scale(1, 0.1);
        }
        .robot-body {
          width: ${baseUnit * 20}px;
          height: ${baseUnit * 22.5}px;
          position: absolute;
          top: ${baseUnit * 15}px;
          left: ${baseUnit * 2.5}px;
          display: block;
          overflow: hidden;
          border-radius: 50% 50% 50% 50%/30% 30% 70% 70%;
          background: ${shapeColor};
        }
        .robot-body::after {
          content: "";
          display: block;
          width: ${baseUnit * 3.75}px;
          height: ${baseUnit * 3.75}px;
          position: absolute;
          top: ${baseUnit * 6.25}px;
          left: ${baseUnit * 12}px;
          border-radius: 50%;
        }
        .robot-hand {
          width: ${baseUnit * 8.5}px;
          height: ${baseUnit * 8.5}px;
          position: absolute;
          top: ${baseUnit * 7.5}px;
          left: ${baseUnit * 21.25}px;
          display: block;
          border-radius: 50%;
          transform-origin: 50% ${baseUnit * 12}px;
          box-shadow: 0 ${baseUnit * 7.5}px 0 ${-baseUnit * 2.5}px ${shapeColor};
        }
        .robot-hand::after {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          -webkit-clip-path: polygon(0% 0%, 50% 50%, 100% 0%, 100% 100%, 0% 100%);
                  clip-path: polygon(0% 0%, 50% 50%, 100% 0%, 100% 100%, 0% 100%);
          border-radius: 50%;
          box-shadow: 0 0 0 ${baseUnit * 2.5}px ${shapeColor} inset;
        }
        .robot::after {
          content: "";
          display: block;
          width: ${baseUnit * 15}px;
          height: ${baseUnit * 3.75}px;
          position: absolute;
          top: ${baseUnit * 40}px;
          left: ${baseUnit * 5}px;
          border-radius: 50%;
        }
      `}
      </style>
    </div>
  )
}

export default RobotHandShake;