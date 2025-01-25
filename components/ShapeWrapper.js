"use client";

import React, { useState, useEffect } from "react";

const ShapeWrapper = ({selectedTool, ShapeComponent, initialSize, initialPosition, scale, panOffset, onClick}) => {
  const [selected, setSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [finalPosition, setFinalPosition] = useState(initialPosition);

  useEffect(() => {
    const updatedPosition = {
      x: initialPosition.x + panOffset.x,
      y: initialPosition.y + panOffset.y,
    };
    setFinalPosition(updatedPosition);
  }, [initialPosition, panOffset])

  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: `${finalPosition.y * scale}px`,
        left: `${finalPosition.x * scale}px`,
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
      <ShapeComponent size={initialSize} scale={scale} position={finalPosition} />
    </div>
  );
};

export default ShapeWrapper;
