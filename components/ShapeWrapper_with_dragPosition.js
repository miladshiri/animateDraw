"use client";

import React, { useState, useEffect } from "react";

const ShapeWrapper = ({selectedTool, ShapeComponent, initialSize, scale, initialPosition, panOffset}) => {
  const [selected, setSelected] = useState(false);

  const [newPosition, setNewPosition] = useState(initialPosition);

  const [dragPosition, setDragPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [finalPosition, setFinalPosition] = useState(initialPosition);

  const handleMouseDown = (e) => {
    if (selectedTool == 'select') { 
      setDragOffset({
        x: e.clientX,
        y: e.clientY,
      });
      setIsDragging(true);
      setSelected(true);
    }
  };

  const handleMouseMove = (e) => {
    if (selectedTool == 'select') { 
      if (isDragging) {
        // Update the position based on the mouse movement
        setDragPosition({
          x: (e.clientX - dragOffset.x) / scale + newPosition.x,
          y: (e.clientY - dragOffset.y) / scale + newPosition.y,
        });
      }
    }
  };

  const handleMouseUp = () => {
    if (selectedTool == 'select') {
      if (isDragging) {
        setIsDragging(false); // Stop dragging
      }
    }
  };

  useEffect(() => {
    setFinalPosition({
      x: dragPosition.x + panOffset.x,
      y: dragPosition.y + panOffset.y,
    })
  }, [dragPosition, panOffset])

  useEffect(() => {
    if (!isDragging) {
      setNewPosition(dragPosition);
    }
  }, [isDragging])

  // Add global mouse event listeners when dragging starts
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    // Cleanup listeners on component unmount or state change
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

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
