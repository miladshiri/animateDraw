"use client";
// components/WaveRectangle.js
import React, { useState } from "react";

const WaveRectangle = () => {
  const [rectangles, setRectangles] = useState([]); // Stores all copied rectangles

  const handleDragStart = (e) => {
    // Save the drag origin position in the dataTransfer object
    e.dataTransfer.setData("text/plain", JSON.stringify({ x: e.clientX, y: e.clientY }));
  };

  const handleDrop = (e) => {
    e.preventDefault();

    // Get the drag origin from dataTransfer
    const { x, y } = JSON.parse(e.dataTransfer.getData("text/plain"));

    // Calculate the position of the rectangle at drop location
    const dropPosition = {
      x: e.clientX - (x - 100), // Adjust based on rectangle width (100px offset)
      y: e.clientY - (y - 50), // Adjust based on rectangle height (50px offset)
    };

    // Add a new rectangle at the drop position
    setRectangles((prev) => [...prev, dropPosition]);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Required to allow dropping
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f4f4f4",
        overflow: "hidden",
      }}
    >
      {/* Original Draggable Rectangle */}
      <div
        draggable
        onDragStart={handleDragStart}
        style={{
          position: "absolute",
          top: "50px",
          left: "50px",
          width: "200px",
          height: "100px",
          backgroundColor: "#3498db",
          animation: "wave 2s ease-in-out infinite",
          cursor: "grab",
        }}
      >
        Drag Me
      </div>

      {/* Render all copied rectangles */}
      {rectangles.map((rect, index) => (
        <div
        draggable
        onDragStart={handleDragStart}
          key={index}
          style={{
            position: "absolute",
            top: rect.y,
            left: rect.x,
            width: "200px",
            height: "100px",
            backgroundColor: "#2ecc71",
            animation: "wave 2s ease-in-out infinite",
          }}
        />
      ))}

    </div>
  );
};

export default WaveRectangle;
