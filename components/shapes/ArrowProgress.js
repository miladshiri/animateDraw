import React from "react";
import { defaultSettings } from "../shapeToComponentMapping";
import { motion } from "framer-motion";

const ArrowProgress = ({ size, shapeSettings, scale }) => {
  var startX = shapeSettings ? (shapeSettings.startX ? shapeSettings.startX : defaultSettings['Arrow'].startX) : defaultSettings['Arrow'].startX
  var startY = shapeSettings ? (shapeSettings.startY ? shapeSettings.startY : defaultSettings['Arrow'].startY) : defaultSettings['Arrow'].startY
  var endX = shapeSettings ? (shapeSettings.endX ? shapeSettings.endX : defaultSettings['Arrow'].endX) : defaultSettings['Arrow'].endX
  var endY = shapeSettings ? (shapeSettings.endY ? shapeSettings.endY : defaultSettings['Arrow'].endY) : defaultSettings['Arrow'].endY
  var head = shapeSettings ? (shapeSettings.head ? shapeSettings.head : defaultSettings['Arrow'].head) : defaultSettings['Arrow'].head

  const shapeColor = shapeSettings ? (shapeSettings.shapeColor ? shapeSettings.shapeColor : defaultSettings['Arrow'].shapeColor) : defaultSettings['Arrow'].shapeColor
  const flowColor = shapeSettings ? (shapeSettings.flowColor ? shapeSettings.flowColor : defaultSettings['Arrow'].flowColor) : defaultSettings['Arrow'].flowColor
  const thickness = shapeSettings ? (shapeSettings.thickness ? shapeSettings.thickness : defaultSettings['Arrow'].thickness) : defaultSettings['Arrow'].thickness
  const animationSpeed = shapeSettings ? (shapeSettings.animationSpeed ? shapeSettings.animationSpeed : defaultSettings['Arrow'].animationSpeed) : defaultSettings['Arrow'].animationSpeed
  var thicknessSize = 0;

  var speed = 1;
  if (animationSpeed == 'slow') {
    speed = 4;
  }
  else if (animationSpeed == 'normal') {
    speed = 1;
  }
  else if (animationSpeed == 'fast') {
    speed = 0.4;
  }
  else {
    speed = 0;
  }

  if (thickness == 'narrow') {
    thicknessSize = 6;
  }
  else if (thickness == 'bold') {
    thicknessSize = 20;
  } else {
    thicknessSize = 10;
  }

  var startX = startX / 100 * size.w;
  var startY = startY / 100 * size.h;
  var endX = endX / 100 * size.w;
  var endY = endY / 100 * size.h;

  if (!scale) {
    scale = 0.9;
  }

  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
  const length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

  return (
    <div
      style={{
        position: "relative",
        top: `-${thicknessSize * scale / 2}px`,
        left: `0px`,
        width: `100%`,
        height: `100%`,
      }}
    >
      <div style={{
        position: "absolute",
        width: `${length}px`,
        height: `${thicknessSize * scale}px`,
        top: `${startY}px`,
        left: `${startX}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `rotate(${angle}deg)`,
        transformOrigin: "left center",
      }}>
        {(head === "start" || head === "both") && (
          <div
            style={{
              position: "absolute",
              left: "0",
              width: `${thicknessSize * 2}px`,
              height: `${thicknessSize * 2}px`,
              backgroundColor: shapeColor,
              clipPath: "polygon(100% 0, 0 50%, 100% 100%)"
            }}
          ></div>
        )}
        <div
          style={{
            position: "absolute",
            left: head === "start" || head === "both" ? `${thicknessSize * 2}px` : "0",
            right: head === "end" || head === "both" ? `${thicknessSize * 2}px` : "0",
            height: `${thicknessSize / 2 * scale}px`,
            backgroundColor: shapeColor,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <svg style={{ width: '100%', height: '100%' }}>
            {head === "both" ? (
              <>
                <motion.path
                  key={`progress-left-${startX}-${startY}-${endX}-${endY}-${speed}-${thicknessSize}-${scale}-${flowColor}`}
                  d={`M ${(length - (thicknessSize * 4)) / 2} 0 L 0 0`}
                  fill="none"
                  stroke={flowColor}
                  strokeWidth={thicknessSize * scale}
                  style={{
                    filter: `drop-shadow(0 0 ${thicknessSize * scale / 2}px ${flowColor})`,
                  }}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: speed * length / scale / 600,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.path
                  key={`progress-right-${startX}-${startY}-${endX}-${endY}-${speed}-${thicknessSize}-${scale}-${flowColor}`}
                  d={`M ${(length - (thicknessSize * 4)) / 2} 0 L ${length - (thicknessSize * 4)} 0`}
                  fill="none"
                  stroke={flowColor}
                  strokeWidth={thicknessSize * scale}
                  style={{
                    filter: `drop-shadow(0 0 ${thicknessSize * scale / 2}px ${flowColor})`,
                  }}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: speed * length / scale / 600,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </>
            ) : (
              <motion.path
                key={`progress-${startX}-${startY}-${endX}-${endY}-${speed}-${thicknessSize}-${scale}-${flowColor}`}
                d={`M 0 0 L ${length - (head === "end" ? thicknessSize * 2 : 0)} 0`}
                fill="none"
                stroke={flowColor}
                strokeWidth={thicknessSize * scale}
                style={{
                  filter: `drop-shadow(0 0 ${thicknessSize * scale / 2}px ${flowColor})`,
                }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: speed * length / scale / 300,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </svg>
        </div>
        {(head === "end" || head === "both") && (
          <div
            style={{
              position: "absolute",
              right: "0",
              width: `${thicknessSize * 2}px`,
              height: `${thicknessSize * 1.5}px`,
              backgroundColor: shapeColor,
              clipPath: "polygon(0% 100%, 100% 50%, 0% 0%)"
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default ArrowProgress; 