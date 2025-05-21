import React from "react";
import { defaultSettings } from "../shapeToComponentMapping";
import { motion } from "framer-motion";

const Arrow = ({ size, shapeSettings, scale }) => {

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

  const path = [
    { x: 0},
    { x: length - thicknessSize * scale * 4},
  ];

  const headSize = thicknessSize * scale * 2;

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
            width: `${scale * thicknessSize * 2}px`,
            height: `${scale * thicknessSize * 2}px`,
            backgroundColor: shapeColor,
            clipPath: "polygon(100% 0, 0 50%, 100% 100%)"
          }}
        ></div>
      )}
      <div
        style={{
          flexGrow: 1,
          height: `${thicknessSize / 2 * scale}px`,
          backgroundColor: shapeColor,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <motion.div
          key={speed}
          style={{
            width: `${thicknessSize * scale}px`,
            height: `${thicknessSize * scale}px`,
            backgroundColor: flowColor,
            borderRadius: "50%",
            boxShadow: `0px 0px ${thicknessSize * scale / 2}px ${thicknessSize * scale / 2}px ${flowColor}`
          }}
          animate={{
            x: head === "both" ? 
              [0, length - thicknessSize * scale * 4 - (thicknessSize * scale / 2), 0] : 
              [0, length - (head === "end" ? thicknessSize * 2 + (thicknessSize * scale / 2) : thicknessSize * 2 + (thicknessSize * scale / 2))]
          }}
          transition={{
            repeat: Infinity,
            duration: speed * length / scale / 300,
            ease: "linear",
            times: head === "both" ? [0, 0.5, 1] : [0, 1]
          }}
        />

      </div>
      {(head === "end" || head === "both") && (
        <div
        style={{
          width: `${scale * thicknessSize * 2}px`,
          height: `${scale * thicknessSize * 1.5}px`,
          backgroundColor: shapeColor,
          clipPath: "polygon(0% 100%, 100% 50%, 0% 0%)"
        }}
      ></div>
      )}

    </div>
    </div>
  );
};

export default Arrow;
