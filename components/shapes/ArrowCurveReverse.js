import React from "react";
import { defaultSettings } from "../shapeToComponentMapping";
import { motion } from "framer-motion";

const ArrowCurveReverse = ({ size, shapeSettings, scale }) => {
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

  // Calculate control points for the cubic Bezier curve (reversed direction)
  const controlX1 = startX + (endX - startX) * 0.25;
  const controlY1 = startY + (endY - startY) * 0.5 - Math.abs(endX - startX) * 0.3; // Negative offset for reverse curve
  const controlX2 = startX + (endX - startX) * 0.75;
  const controlY2 = startY + (endY - startY) * 0.5 - Math.abs(endX - startX) * 0.3; // Negative offset for reverse curve

  // Create SVG path for the curve
  const path = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;

  // Calculate the angle for the arrow head
  const headAngle = Math.atan2(endY - controlY2, endX - controlX2) * (180 / Math.PI);
  // Calculate the angle for the tail
  const tailAngle = Math.atan2(controlY1 - startY, controlX1 - startX) * (180 / Math.PI);

  // Calculate head size
  const headSize = thicknessSize * scale;

  // Calculate the total length of the curve
  const curveLength = Math.sqrt(
    Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
  );

  // Calculate the offset ratio based on head size
  const offsetRatio = headSize / curveLength;

  // Calculate exact positions for arrow heads along the curve
  const startOffsetX = startX - (controlX1 - startX) * offsetRatio * 2;
  const startOffsetY = startY - (controlY1 - startY) * offsetRatio * 2;
  const endOffsetX = endX + (endX - controlX2) * offsetRatio * 2;
  const endOffsetY = endY + (endY - controlY2) * offsetRatio * 2;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
      >
        {/* Main curve path */}
        <path
          key={`main-${path}-${thicknessSize}-${scale}`}
          d={path}
          fill="none"
          stroke={shapeColor}
          strokeWidth={thicknessSize * scale}
        />
        
        {/* Animated flow element */}
        {speed > 0 && (
          <motion.path
            key={`flow-${path}-${speed}-${thicknessSize}-${scale}-${flowColor}`}
            d={path}
            fill="none"
            stroke={flowColor}
            strokeWidth={thicknessSize * scale}
            style={{
              filter: `drop-shadow(0 0 ${thicknessSize * scale / 2}px ${flowColor})`,
            }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: speed * Math.abs(endX - startX) / scale / 300,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        {/* Arrow heads */}
        {(head === "start" || head === "both") && (
          <path
            d={`M ${startOffsetX} ${startOffsetY} L ${startOffsetX + headSize} ${startOffsetY - headSize} L ${startOffsetX + headSize} ${startOffsetY + headSize} Z`}
            fill={shapeColor}
            transform={`rotate(${tailAngle} ${startOffsetX} ${startOffsetY})`}
          />
        )}

        {(head === "end" || head === "both") && (
          <path
            d={`M ${endOffsetX} ${endOffsetY} L ${endOffsetX - headSize} ${endOffsetY - headSize} L ${endOffsetX - headSize} ${endOffsetY + headSize} Z`}
            fill={shapeColor}
            transform={`rotate(${headAngle} ${endOffsetX} ${endOffsetY})`}
          />
        )}
      </svg>
    </div>
  );
};

export default ArrowCurveReverse; 