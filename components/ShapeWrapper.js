"use client";

import React, { useState, useEffect, use } from "react";

const ShapeWrapper = ({selectedTool, ShapeComponent, initialSize, finalPosition, scale, offset, onClick}) => {
  const [selected, setSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [finalSize, setFinalSize] = useState({});

  useEffect(() => {
    setFinalSize({
      w: initialSize.w * scale,
      h: initialSize.h * scale,
    })
  }, [initialSize])

  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: `${(finalPosition.y - offset.y) * scale }px`,
        left: `${(finalPosition.x - offset.x) * scale }px`,
        width: `${initialSize.w * scale}px`,
        height: `${initialSize.h * scale}px`,
      }}
    >
    {selected && (
        <div
          style={{
            position: "absolute",
            top: `${-4 * scale}px`,
            left: `${-4 * scale}px`,
            right: `${-4 * scale}px`,
            bottom: `${-4 * scale}px`,
            border: "2px dotted rgb(0, 68, 140)",
            pointerEvents: "none", // Prevent interaction with the border
          }}
        ></div>
      )}
      <ShapeComponent size={finalSize} scale={scale} position={finalPosition} />
    </div>
  );
};

export default ShapeWrapper;
