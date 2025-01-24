"use client";

import React, { useState, useEffect } from "react";

const ShapeWrapper = ({selectedTool, ShapeComponent, initialSize, scale, initialPosition, panOffset}) => {
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
        userSelect: 'none', // Prevent text selection while dragging
      }}
    >
      <ShapeComponent size={initialSize} scale={scale} position={finalPosition} />
    </div>
  );
};

export default ShapeWrapper;
