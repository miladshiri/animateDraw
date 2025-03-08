import { useState, useEffect } from "react";
import { defaultSettings } from "../shapeToComponentMapping";

const RobotHandShake = ({ size, shapeSettings, scale }) => {
  var speed = 4;

  if (shapeSettings) {
    if (shapeSettings.animationSpeed == 'slow') {
      speed = 8;
    }
    else if (shapeSettings.animationSpeed == 'normal') {
      speed = 4;
    }
    else if (shapeSettings.animationSpeed == 'fast') {
      speed = 1;
    }
  }

  // Calculate base unit based on size
  const baseUnit = Math.min(size.w, size.h) / 40; // 40 is our base unit for calculations
  
  // Get shape color from settings or use white as default
  const shapeColor = shapeSettings?.shapeColor || defaultSettings['RobotHandShake'].shapeColor || "#ffffff";

  return (
    <div style={{ padding: `${baseUnit * 5}px` }}>
      <div className="robot">
        <div className="robot-head"></div>
        <div className="robot-body"></div>
        <div className="robot-hand"></div>
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
        @-webkit-keyframes beat {
          0% {
            background-color: rebeccapurple;
            box-shadow: 0 0 0 0 rgba(220, 20, 60, 0.3);
          }
          50%, 70% {
            background-color: powderblue;
            box-shadow: 0 0 ${baseUnit * 10}px ${baseUnit * 12.5}px rgba(176, 224, 230, 0);
          }
          100% {
            background-color: rebeccapurple;
          }
        }
        @keyframes beat {
          0% {
            background-color: rebeccapurple;
            box-shadow: 0 0 0 0 rgba(220, 20, 60, 0.3);
          }
          50%, 70% {
            background-color: powderblue;
            box-shadow: 0 0 ${baseUnit * 10}px ${baseUnit * 12.5}px rgba(176, 224, 230, 0);
          }
          100% {
            background-color: rebeccapurple;
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
        @-webkit-keyframes wobble {
          0% {
            transform: translate(${-baseUnit * 0.25}px, 0);
            background-color: crimson;
            box-shadow: 0 0 0 0 rgba(220, 20, 60, 0.3);
          }
          50%, 70% {
            transform: translate(${baseUnit * 0.25}px, 0);
            background-color: mediumvioletred;
            box-shadow: 0 0 ${baseUnit * 10}px ${baseUnit * 12.5}px rgba(220, 20, 60, 0);
          }
          100% {
            transform: translate(${-baseUnit * 0.25}px, 0);
            background-color: rebeccapurple;
          }
        }
        @keyframes wobble {
          0% {
            transform: translate(${-baseUnit * 0.25}px, 0);
            background-color: crimson;
            box-shadow: 0 0 0 0 rgba(220, 20, 60, 0.3);
          }
          50%, 70% {
            transform: translate(${baseUnit * 0.25}px, 0);
            background-color: mediumvioletred;
            box-shadow: 0 0 ${baseUnit * 10}px ${baseUnit * 12.5}px rgba(220, 20, 60, 0);
          }
          100% {
            transform: translate(${-baseUnit * 0.25}px, 0);
            background-color: rebeccapurple;
          }
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .robot {
          display: block;
          position: relative;
          -webkit-animation: hover 1500ms ease-in-out alternate infinite;
                  animation: hover 1500ms ease-in-out alternate infinite;
        }
        .robot-head {
          width: ${baseUnit * 25}px;
          height: ${baseUnit * 12.5}px;
          display: block;
          position: relative;
          border-radius: ${baseUnit * 6.25}px;
          background-color: black;
          box-shadow: 0 0 0 ${baseUnit * 3.25}px ${shapeColor} inset;
          transition: transform ease-in-out 350ms;
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
          background-color: powderblue;
          box-shadow: ${baseUnit * 12.25}px 0 powderblue;
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
          -webkit-animation: beat 4500ms linear infinite;
                  animation: beat 4500ms linear infinite;
        }
        .robot-body:hover::after {
          -webkit-animation: wobble 1000ms linear infinite;
                  animation: wobble 1000ms linear infinite;
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
          -webkit-animation: wave 1000ms alternate ease-in-out infinite;
                  animation: wave 1000ms alternate ease-in-out infinite;
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
          -webkit-animation: shadow 1500ms ease-in-out alternate infinite;
                  animation: shadow 1500ms ease-in-out alternate infinite;
        }
      `}
      </style>
    </div>
  )
}

export default RobotHandShake;