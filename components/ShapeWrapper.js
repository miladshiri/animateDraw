"use client";

import React, { useState, useEffect } from "react";

const ShapeWrapper = ({selectedTool, ShapeComponent, initialSize, scale, initialPosition, position}) => {
  const [dragPosition, setDragPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (selectedTool == 'select') { 
      setDragOffset({
        x: e.clientX - dragPosition.x,
        y: e.clientY - dragPosition.y,
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (selectedTool == 'select') { 
      if (isDragging) {
        // Update the position based on the mouse movement
        setDragPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
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
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none', // Prevent text selection while dragging
      }}
    >
      <ShapeComponent initialSize={initialSize} scale={scale} initialPosition={initialPosition} position={position} dragPosition={dragPosition} />
    </div>
  );
};

export default ShapeWrapper;
