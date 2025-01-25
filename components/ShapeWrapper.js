"use client";

import React, { useState, useEffect } from "react";

const ShapeWrapper = ({selectedTool, ShapeComponent, initialSize, initialPosition, scale, panOffset}) => {
  const [selected, setSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [finalPosition, setFinalPosition] = useState(initialPosition);

  const handleMouseDown = (e) => {
    if (selectedTool == 'select') { 
      setSelected(true);
    }
  };

  useEffect(() => {
    const updatedPosition = {
      x: initialPosition.x + panOffset.x,
      y: initialPosition.y + panOffset.y,
    };
    setFinalPosition(updatedPosition);
  }, [initialPosition, panOffset])

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        top: `${finalPosition.y * scale}px`,
        left: `${finalPosition.x * scale}px`,
        width: `${initialSize.w * scale}px`,
        height: `${initialSize.h * scale}px`,
        cursor: (() => {
          if (selectedTool === 'pan') return 'move';
          if (selectedTool === 'select') {
            if (isDragging) return 'grabbing';
            return 'grab';
          }
          else {
            return 'default';
          }
        })(),
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

{selected && (
        <>
          {/* Top-left corner */}
          <div
            style={{
              position: 'absolute',
              top: '-5px',
              left: '-5px',
              width: '10px',
              height: '10px',
              backgroundColor: 'white',
              border: '1px solid black',
              borderRadius: '50%',
            }}
          />
          {/* Top-right corner */}
          <div
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              width: '10px',
              height: '10px',
              backgroundColor: 'white',
              border: '1px solid black',
              borderRadius: '50%',
            }}
          />
          {/* Bottom-left corner */}
          <div
            style={{
              position: 'absolute',
              bottom: '-5px',
              left: '-5px',
              width: '10px',
              height: '10px',
              backgroundColor: 'white',
              border: '1px solid black',
              borderRadius: '50%',
            }}
          />
          {/* Bottom-right corner */}
          <div
            style={{
              position: 'absolute',
              bottom: '-5px',
              right: '-5px',
              width: '10px',
              height: '10px',
              backgroundColor: 'white',
              border: '1px solid black',
              borderRadius: '50%',
            }}
          />
        </>
      )}

      <ShapeComponent size={initialSize} scale={scale} position={finalPosition} />
    </div>
  );
};

export default ShapeWrapper;
