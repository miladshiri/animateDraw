import React from "react";
import { defaultSettings } from "../shapeToComponentMapping";
import { motion } from "framer-motion";

const ArrowBar = ({ size, shapeSettings, scale }) => {
  var startX = shapeSettings ? (shapeSettings.startX ? shapeSettings.startX : defaultSettings['ArrowBar'].startX) : defaultSettings['ArrowBar'].startX
  var startY = shapeSettings ? (shapeSettings.startY ? shapeSettings.startY : defaultSettings['ArrowBar'].startY) : defaultSettings['ArrowBar'].startY
  var endX = shapeSettings ? (shapeSettings.endX ? shapeSettings.endX : defaultSettings['ArrowBar'].endX) : defaultSettings['ArrowBar'].endX
  var endY = shapeSettings ? (shapeSettings.endY ? shapeSettings.endY : defaultSettings['ArrowBar'].endY) : defaultSettings['ArrowBar'].endY
  var head = shapeSettings ? (shapeSettings.head ? shapeSettings.head : defaultSettings['ArrowBar'].head) : defaultSettings['ArrowBar'].head

  const shapeColor = shapeSettings ? (shapeSettings.shapeColor ? shapeSettings.shapeColor : defaultSettings['ArrowBar'].shapeColor) : defaultSettings['ArrowBar'].shapeColor
  const flowColor = shapeSettings ? (shapeSettings.flowColor ? shapeSettings.flowColor : defaultSettings['ArrowBar'].flowColor) : defaultSettings['ArrowBar'].flowColor
  const thickness = shapeSettings ? (shapeSettings.thickness ? shapeSettings.thickness : defaultSettings['ArrowBar'].thickness) : defaultSettings['ArrowBar'].thickness
  const animationSpeed = shapeSettings ? (shapeSettings.animationSpeed ? shapeSettings.animationSpeed : defaultSettings['ArrowBar'].animationSpeed) : defaultSettings['ArrowBar'].animationSpeed
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
    { x: length - thicknessSize * scale * 7 * length / 200},
  ];

  const headSize = (size.h + size.w) / 10;

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
            width: `${thicknessSize * scale * 5 * length / 200}px`,
            height: `${thicknessSize * scale / 2}px`,
            backgroundColor: flowColor,
            position: 'relative',
            overflow: 'hidden',
          }}
          animate={{
            x: path.map((point) => point.x),
          }}
          transition={{
            repeat: Infinity,
            duration: speed * length / scale / 300,
            ease: "linear",
          }}
        >
        </motion.div>
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

export default ArrowBar; 