"use client";
import Image from "next/image";

import WaveRectangle from "@/components/WaveRectangle";
import AnimatedRec from "@/components/AnimatedRec";
import React, { useState, useEffect } from "react";
import ShapeWrapper from "@/components/ShapeWrapper";
import Toolbar from "@/components/Toolbar";

export default function Home() {
  const panMode = true;
  const [scale, setScale] = useState(1); // Zoom scale
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Drag position
  const [isDragging, setIsDragging] = useState(false); // Dragging state
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 }); // Mouse position when dragging starts

  const [selectedTool, setSelectedTool] = useState('');
  const [shapes, setShapes] = useState([]);

  const handleWheel = (e) => {
    e.preventDefault();
    setScale((prevScale) => {
      const newScale = prevScale + (e.deltaY > 0 ? -0.1 : 0.1);
      return Math.min(Math.max(newScale, 0.5), 2);
    });
  };

  const handleMouseDown = (e) => {
    e.preventDefault();

    console.log(selectedTool);
    if (selectedTool == 'pan') {
      setIsDragging(true);
      setStartDragPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
    else if (selectedTool == 'square') {
      console.log('place new square');
    }
  };

  const handleMouseMove = (e) => {
    if (selectedTool == 'pan') {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - startDragPos.x,
        y: e.clientY - startDragPos.y,
      });
    }
  };

  const handleMouseUp = () => {
    if (selectedTool == 'pan') {
      setIsDragging(false);
    }
  };

  const initialPosition1 = { x: 0, y: 100 };
  const initialPosition2 = { x: 250, y: 100 };
  const initialPosition3 = { x: 550, y: 200 };

  const initialSize1 = {w: 100, h:100};
  const initialSize2 = {w: 250, h:100};
  const initialSize3 = {w: 200, h:200};

  return (
    <div
    style={{
      position: "fixed",
        top: 0,
        left: 0,
      width: "100vw",       // Full width of the viewport
      height: "100vh",      // Full height of the viewport
      overflow: "hidden",   // Prevent scrolling
      backgroundColor: "#3498db", // Example background color (blue)
      display: "flex",      // Flexbox for centering
      alignItems: "center", // Center content vertically
      justifyContent: "center", // Center content horizontally
    }}

      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Toolbar setSelectedTool={setSelectedTool}/>
      {/* <WaveRectangle /> */}
      {/* <AnimatedRec scale={scale} initialPosition={initialPosition1} position={position}/>
      <AnimatedRec scale={scale} initialPosition={initialPosition2} position={position}/> */}
      <ShapeWrapper selectedTool={selectedTool} ShapeComponent={AnimatedRec} initialSize={initialSize1} scale={scale} initialPosition={initialPosition1} position={position} />
      <ShapeWrapper selectedTool={selectedTool} ShapeComponent={AnimatedRec} initialSize={initialSize2} scale={scale} initialPosition={initialPosition2} position={position} />
      <ShapeWrapper selectedTool={selectedTool} ShapeComponent={AnimatedRec} initialSize={initialSize3} scale={scale} initialPosition={initialPosition3} position={position} />
      {scale}
    </div>
  );
}
