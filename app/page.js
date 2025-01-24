"use client";
import Image from "next/image";

import WaveRectangle from "@/components/WaveRectangle";
import AnimatedRec from "@/components/AnimatedRec";
import React, { useState, useEffect, useRef } from "react";
import ShapeWrapper from "@/components/ShapeWrapper";
import Toolbar from "@/components/Toolbar";

export default function Home() {
  const defaultShapes = [
    {x:100, y:50, w: 100, h:70},
    {x:400, y:250, w: 30, h:170}
  ]
  
  const [allShapes, setAllShapes] = useState(defaultShapes);

  const [scale, setScale] = useState(1); 
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 }); 
  const [panOffsetDrag, setPanOffsetDrag] = useState({ x: 0, y: 0 }); 
  const [isDragging, setIsDragging] = useState(false); 
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 }); 

  const [selectedTool, setSelectedTool] = useState('');

  const [drawing, setDrawing] = useState(false); 
  const [currentShape, setCurrentShape] = useState(null);

  const [selectionBox, setSelectionBox] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);

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
    else if (selectedTool == 'select') {
      setIsSelecting(true);
      const startX = e.clientX;
      const startY = e.clientY;
  
      setSelectionBox({
        x: startX,
        y: startY,
        width: 0,
        height: 0,
      });
  
    }
    else if (selectedTool == 'square') {
      const startX = e.clientX;
      const startY = e.clientY;

      setDrawing(true);
      setCurrentShape({ x: startX, y: startY, width: 0, height: 0 });
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
    else if (selectedTool == 'select') {
      if (!isSelecting) return;

      const currentX = e.clientX;
      const currentY = e.clientY;

      const width = currentX - selectionBox.x;
      const height = currentY - selectionBox.y;

      setSelectionBox({
        x: Math.min(currentX, selectionBox.x),
        y: Math.min(currentY, selectionBox.y),
        width: Math.abs(width),
        height: Math.abs(height),
      });
    }
    else if (selectedTool == 'square') {
      if (!drawing || !currentShape) return;
        const currentX = e.clientX;
        const currentY = e.clientY;
    
        const width = currentX - currentShape.x;
        const height = currentY - currentShape.y;
    
        setCurrentShape((prev) => ({
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
    else if (selectedTool == 'select') {
      setIsSelecting(false);
      const box = selectionBox;
      if (box) {
        const selected = [];
        allShapes.forEach((shape) => {
          console.log(shape);
          console.log(box);
          if (
            box.x / scale < shape.x &&
            box.x / scale + box.width / scale > shape.x + shape.w &&
            box.y / scale < shape.y &&
            box.y / scale + box.height / scale > shape.y + shape.h
          ) {
            selected.push(shape);
            }
        });
        setSelectedItems(selected);
        console.log(selected);
      }
      setSelectionBox(null);
    }
    else if (selectedTool == 'square') {
      if (drawing && currentShape) {
        setAllShapes((prev) => [...prev, {
          x: currentShape.x / scale,
          y: currentShape.y / scale,
          w: currentShape.width / scale,
          h: currentShape.height / scale,
        }]);
        setDrawing(false);
        setCurrentShape(null);
      }
    }
  };


  return (
    <div
    style={{
      position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#3498db",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: selectedTool == 'pan' ? 'move' : 'default'
    }}

      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Toolbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />

      {allShapes.map((shape, index) => (
        <ShapeWrapper key={index} selectedTool={selectedTool} ShapeComponent={AnimatedRec} initialSize={{w:shape.w, h:shape.h}} scale={scale} initialPosition={{x:shape.x, y:shape.y}} panOffset={panOffsetDrag} />
      ))}

       {/* Render the shape being drawn */}
       {drawing && currentShape && (
          <ShapeWrapper selectedTool={selectedTool} ShapeComponent={AnimatedRec} initialSize={{w:currentShape.width / scale, h:currentShape.height / scale}} scale={scale} initialPosition={{x:currentShape.x / scale, y:currentShape.y / scale}} panOffset={panOffsetDrag} />
       )}

       {/* Selection Box */}
      {selectionBox && (
        <div
          style={{
            position: "absolute",
            top: `${selectionBox.y}px`,
            left: `${selectionBox.x}px`,
            width: `${selectionBox.width}px`,
            height: `${selectionBox.height}px`,
            backgroundColor: "rgba(0, 120, 215, 0.2)",
            border: "1px solid #0078d7",
            pointerEvents: "none",
          }}
        ></div>
      )}

      {scale}
    </div>
  );
}
