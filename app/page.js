"use client";
import Image from "next/image";

import WaveRectangle from "@/components/WaveRectangle";
import AnimatedRec from "@/components/AnimatedRec";
import React, { useState, useEffect, useRef } from "react";
import ShapeWrapper from "@/components/ShapeWrapper";
import Toolbar from "@/components/Toolbar";

export default function Home() {

  const [scale, setScale] = useState(1); 
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 }); 
  const [panOffsetDrag, setPanOffsetDrag] = useState({ x: 0, y: 0 }); 
  const [isDragging, setIsDragging] = useState(false); 
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 }); 

  const [selectedTool, setSelectedTool] = useState('');
  const [shapes, setShapes] = useState([]);

  const [drawing, setDrawing] = useState(false); 
  const [currentRect, setCurrentRect] = useState(null);

  
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
      setStartDragPos({ x: e.clientX, y: e.clientY });
    }
    else if (selectedTool == 'square') {
      console.log('place new square');
      const startX = e.clientX;
      const startY = e.clientY;

      setDrawing(true);
      setCurrentRect({ x: startX, y: startY, width: 0, height: 0 });
    }
  };

  const handleMouseMove = (e) => {
    if (selectedTool == 'pan') {
      if (!isDragging) return;
      setPanOffsetDrag({
        x: (e.clientX - startDragPos.x) / scale + panOffset.x,
        y: (e.clientY - startDragPos.y) / scale + panOffset.y,
      });
    }
    else if (selectedTool == 'square') {
      if (!drawing || !currentRect) return;
        const currentX = e.clientX;
        const currentY = e.clientY;
    
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
      setPanOffset(panOffsetDrag);
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
        cursor: selectedTool == 'pan' ? 'move' : 'default'
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
      <ShapeWrapper selectedTool={selectedTool} ShapeComponent={AnimatedRec} initialSize={initialSize1} scale={scale} initialPosition={initialPosition1} panOffset={panOffsetDrag} />
      <ShapeWrapper selectedTool={selectedTool} ShapeComponent={AnimatedRec} initialSize={initialSize2} scale={scale} initialPosition={initialPosition2} panOffset={panOffsetDrag} />
      <ShapeWrapper selectedTool={selectedTool} ShapeComponent={AnimatedRec} initialSize={initialSize3} scale={scale} initialPosition={initialPosition3} panOffset={panOffsetDrag} />
      
      {shapes.map((shape, index) => (

            <ShapeWrapper key={index} selectedTool={selectedTool} ShapeComponent={AnimatedRec} initialSize={{w:shape.width, h:shape.height}} scale={scale} position={{x:shape.x, y:shape.y}} />
      ))}


       {/* Render the rectangle being drawn */}
       {drawing && currentRect && (
          <ShapeWrapper selectedTool={selectedTool} ShapeComponent={AnimatedRec} initialSize={{w:currentRect.width, h:currentRect.height}} scale={scale} position={{x:currentRect.x, y:currentRect.y}} />
       )}

      {scale}
    </div>
  );
}
