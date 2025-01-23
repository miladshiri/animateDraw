"use client";
import Image from "next/image";

import WaveRectangle from "@/components/WaveRectangle";
import AnimatedRec from "@/components/AnimatedRec";
import React, { useState, useEffect, useRef } from "react";
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

  const [drawing, setDrawing] = useState(false); // Track drawing state
  const [currentRect, setCurrentRect] = useState(null); // Rectangle being drawn
  const containerRef = useRef(null);
  
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
      const startX = e.clientX / scale;
      const startY = e.clientY / scale;

      setDrawing(true);
      setCurrentRect({ x: startX, y: startY, width: 0, height: 0 });
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
    else if (selectedTool == 'square') {
      if (!drawing || !currentRect) return;
        const currentX = e.clientX / scale;
        const currentY = e.clientY / scale;
    
        const width = currentX - currentRect.x;
        const height = currentY - currentRect.y;
    
        setCurrentRect((prev) => ({
          ...prev,
          width: Math.abs(width),
          height: Math.abs(height),
          x: width < 0 ? currentX : prev.x,
          y: height < 0 ? currentY : prev.y,
        }));
    }
  };

  const handleMouseUp = () => {
    if (selectedTool == 'pan') {
      setIsDragging(false);
    }
    else if (selectedTool == 'square') {
      if (drawing && currentRect) {
        setShapes((prev) => [...prev, currentRect]);
        setDrawing(false);
        setCurrentRect(null);
      }
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
      <Toolbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
      {/* <WaveRectangle /> */}
      {/* <AnimatedRec scale={scale} initialPosition={initialPosition1} position={position}/>
      <AnimatedRec scale={scale} initialPosition={initialPosition2} position={position}/> */}
      <ShapeWrapper selectedTool={selectedTool} ShapeComponent={AnimatedRec} initialSize={initialSize1} scale={scale} initialPosition={initialPosition1} position={position} />
      <ShapeWrapper selectedTool={selectedTool} ShapeComponent={AnimatedRec} initialSize={initialSize2} scale={scale} initialPosition={initialPosition2} position={position} />
      <ShapeWrapper selectedTool={selectedTool} ShapeComponent={AnimatedRec} initialSize={initialSize3} scale={scale} initialPosition={initialPosition3} position={position} />
      
      {shapes.map((shape, index) => (

            <ShapeWrapper key={index} selectedTool={selectedTool} ShapeComponent={AnimatedRec} initialSize={{w:shape.width, h:shape.height}} scale={scale} initialPosition={{x:shape.x, y:shape.y}} position={position} />
      ))}


       {/* Render the rectangle being drawn */}
       {drawing && currentRect && (
          <ShapeWrapper selectedTool={selectedTool} ShapeComponent={AnimatedRec} initialSize={{w:currentRect.width, h:currentRect.height}} scale={scale} initialPosition={{x:currentRect.x, y:currentRect.y}} position={position} />
       )}

      {scale}
    </div>
  );
}
