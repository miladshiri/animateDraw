"use client";
import Image from "next/image";

import WaveRectangle from "@/components/WaveRectangle";
import AnimatedRec from "@/components/AnimatedRec";
import React, { useState, useEffect, useRef } from "react";
import ShapeWrapper from "@/components/ShapeWrapper";
import Toolbar from "@/components/Toolbar";

export default function Home() {
  const defaultShapes = [
    {id: 1, x: 100, y: 150, w: 100, h: 170, selected: false},
    {id: 2, x: 400, y: 250, w: 130, h: 170, selected: false}
  ]
  
  const [allShapes, setAllShapes] = useState(() => {
    const savedShapes = localStorage.getItem("shapes");
    return savedShapes ? JSON.parse(savedShapes) : defaultShapes;
  });

  // Load scale state from localStorage or fallback to default
  const [scale, setScale] = useState(() => {
    const savedScale = localStorage.getItem("scale");
    return savedScale ? JSON.parse(savedScale) : 1;
  });

  useEffect(() => {
    localStorage.setItem("shapes", JSON.stringify(allShapes));
    localStorage.setItem("scale", JSON.stringify(scale));
  }, [allShapes, scale]);
  
  const [isPanning, setIsPanning] = useState(false);

  const [selectedTool, setSelectedTool] = useState('');

  const [drawing, setDrawing] = useState(false); 
  const [currentShape, setCurrentShape] = useState(null);

  const [selectionDragBox, setSelectionDragBox] = useState(null);
  const [selectionBox, setSelectionBox] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    if (selectedTool != 'selected') {
      setSelectionBox({x:0, y:0, width:0, height:0});
      setSelectionDragBox([]);
    }
  }, [selectedTool])

  const handleWheel = (e) => {
    e.preventDefault();
    setScale((prevScale) => {
      const newScale = prevScale + (e.deltaY > 0 ? -0.1 : 0.1);
      return Math.min(Math.max(newScale, 0.4), 3);
    });
  };

  const initialPan = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();

    console.log(selectedTool);
    if (selectedTool == 'pan') {
      setIsPanning(true);
      initialPan.current = {
        startX: e.clientX,
        startY: e.clientY,
        initialAllShapes: [...allShapes],
      }
    }
    else if (selectedTool == 'select') {
      const isCtrlPressed = e.ctrlKey || e.metaKey;
      if (isCtrlPressed) return;
      if (isResizing.current) return;

      setIsSelecting(true);
      const startX = e.clientX;
      const startY = e.clientY;
  
      setSelectionDragBox({
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
      const uniqueId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      console.log(uniqueId)
      setCurrentShape({id: uniqueId ,x: startX, y: startY, width: 0, height: 0, selected: false });
    }

  };

  const handleMouseMove = (e) => {
    if (selectedTool == 'pan') {
      if (!isPanning || !initialPan.current) return;

      const { startX, startY, initialAllShapes } = initialPan.current;
      const xDiff = e.clientX - startX;
      const yDiff = e.clientY - startY;
      const shapesUpdatedWithPan = initialAllShapes.map((shape)=> ({
        ...shape,
        x: shape.x + xDiff / scale,
        y: shape.y + yDiff / scale,
      }));

      setAllShapes(shapesUpdatedWithPan);
    }
    else if (selectedTool == 'select') {
      if (!isSelecting) return;
      if (isResizing.current) return;
      if (isDraggingSelectionBox.current) return;

      const currentX = e.clientX;
      const currentY = e.clientY;

      const width = currentX - selectionDragBox.x;
      const height = currentY - selectionDragBox.y;

      setSelectionDragBox({
        x: Math.min(currentX, selectionDragBox.x),
        y: Math.min(currentY, selectionDragBox.y),
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
      setIsPanning(false);
    }
    else if (selectedTool == 'select') {
      setIsSelecting(false);
      const box = selectionDragBox;
      const updateShapes = [];
      var minX = Infinity;
      var minY = Infinity;
      var maxX = 0;
      var maxY = 0;
      var isAnySelected = false;
      if (box) {
        allShapes.forEach((shape) => {
          console.log(shape);
          console.log(box);
          if (
            box.x / scale < shape.x &&
            box.x / scale + box.width / scale > shape.x + shape.w &&
            box.y / scale < shape.y &&
            box.y / scale + box.height / scale > shape.y + shape.h
          ) {
              updateShapes.push({...shape, selected: true});
              isAnySelected = true;
              minX = Math.min(minX, shape.x);
              minY = Math.min(minY, shape.y);
              maxX = Math.max(maxX, shape.x + shape.w);
              maxY = Math.max(maxY, shape.y + shape.h);
            }
            else {
              updateShapes.push({...shape, selected: false});
            }
        });
        setAllShapes(updateShapes);
        console.log(updateShapes);
      }
      setSelectionDragBox(null);

      if (!isAnySelected) {
        setSelectionBox(null);
      }
      else {
        console.log(minX, minY, maxX, maxY)
        setSelectionBox({
          x: minX - 10,
          y: minY - 10,
          width: Math.abs(maxX - minX) + 20,
          height: Math.abs(maxY - minY) + 20,
        })
      }
    }
    else if (selectedTool == 'square') {
      if (drawing && currentShape) {
        setAllShapes((prev) => [...prev, {
          id: currentShape.id,
          x: currentShape.x / scale,
          y: currentShape.y / scale,
          w: currentShape.width / scale,
          h: currentShape.height / scale,
          selected: false
        }]);
        setDrawing(false);
        setCurrentShape(null);
      }
    }
  };

  const isResizing = useRef(false);
  const isDraggingSelectionBox = useRef(false);
  const initialSize = useRef(null);

  const handleMouseDownBottomRight = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isResizing.current = true;

    // Store initial container and mouse positions
    initialSize.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialWidth: selectionBox.width,
      initialHeight: selectionBox.height,
      initialX: selectionBox.x,
      initialY: selectionBox.y,
      initialAllShapes: [...allShapes],
    };

    document.addEventListener("mousemove", handleMouseMoveBottomRight);
    document.addEventListener("mouseup", handleMouseUpBottomRight);
  };

  const handleMouseMoveBottomRight = (e) => {
    if (!isResizing.current || !initialSize.current) return;

    const { startX, startY, initialWidth, initialHeight, initialX, initialY, initialAllShapes } = initialSize.current;

    // Calculate the new size of the container
    const newWidth = Math.max(initialWidth + (e.clientX - startX) / scale, 1); // Minimum width: 50px
    const newHeight = Math.max(initialHeight + (e.clientY - startY) / scale, 1); // Minimum height: 50px

    // Calculate resize ratios
    const widthRatio = newWidth / initialWidth;
    const heightRatio = newHeight / initialHeight;

    // Update elements based on resize ratios
    const resizedItems = initialAllShapes.map((shape) => ({
      ...shape,
      x: shape.selected ? Math.round((shape.x - initialX) * widthRatio + initialX) : shape.x,
      y: shape.selected ? Math.round((shape.y - initialY) * heightRatio + initialY) : shape.y,
      w: shape.selected ? Math.round(shape.w * widthRatio) : shape.w,
      h: shape.selected ? Math.round(shape.h * heightRatio) : shape.h,
    }));

    // Update state
    setSelectionBox({ x: selectionBox.x, y: selectionBox.y, width: newWidth, height: newHeight });
    setAllShapes(resizedItems);
  };


  const handleMouseUpBottomRight = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMoveBottomRight);
    document.removeEventListener("mouseup", handleMouseUpBottomRight);
  };


  const handleMouseDownSelectionBox = (e) => {
    e.preventDefault();
    isDraggingSelectionBox.current = true;

    // Store initial container and mouse positions
    initialSize.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialWidth: selectionBox.width,
      initialHeight: selectionBox.height,
      initialX: selectionBox.x,
      initialY: selectionBox.y,
      initialAllShapes: [...allShapes],
    };

    document.addEventListener("mousemove", handleMouseMoveSelectionBox);
    document.addEventListener("mouseup", handleMouseUpSelectionBox);
  }

  const handleMouseMoveSelectionBox = (e) => {
    if (!isDraggingSelectionBox.current || !initialSize.current) return;

    const { startX, startY, initialWidth, initialHeight, initialX, initialY, initialAllShapes } = initialSize.current;
    const xDiff = (e.clientX - startX);
    const yDiff = (e.clientY - startY)
    // Update elements based on resize ratios
    const resizedItems = initialAllShapes.map((shape) => ({
      ...shape,
      x: shape.selected ? (shape.x + xDiff / scale) : shape.x,
      y: shape.selected ? (shape.y + yDiff / scale) : shape.y,
    }));

    // Update state
    setSelectionBox({ x: selectionBox.x + xDiff / scale, y: selectionBox.y + yDiff / scale, width: selectionBox.width, height: selectionBox.height });
    setAllShapes(resizedItems);
  }

  const handleMouseUpSelectionBox = (e) => {
    isDraggingSelectionBox.current = false;
    document.removeEventListener("mousemove", handleMouseMoveSelectionBox);
    document.removeEventListener("mouseup", handleMouseUpSelectionBox);

  }

  const handleShapeClick = (id, e) => {
    e.stopPropagation();
    if (selectedTool != 'select') return;
    const isCtrlPressed = e.ctrlKey || e.metaKey;

    const updateShapesWithSelect = allShapes.map((shape) => {
        if (isCtrlPressed) {
          // Toggle the clicked shape without affecting others
          return shape.id === id
            ? { ...shape, selected: !shape.selected }
            : shape;
        } else {
          // Select only the clicked shape, deselect others
          return { ...shape, selected: shape.id === id };
        }
      });

    setAllShapes(updateShapesWithSelect);

    var minX = Infinity;
    var minY = Infinity;
    var maxX = 0;
    var maxY = 0;
    var isAnySelected = false;
    updateShapesWithSelect.forEach((shape) => {
      if (shape.selected) {
          isAnySelected = true;
          minX = Math.min(minX, shape.x);
          minY = Math.min(minY, shape.y);
          maxX = Math.max(maxX, shape.x + shape.w);
          maxY = Math.max(maxY, shape.y + shape.h);
        }
    });

    if (!isAnySelected) {
      setSelectionBox(null);
    }
    else {
      setSelectionBox({
        x: minX - 10,
        y: minY - 10,
        width: Math.abs(maxX - minX) + 20,
        height: Math.abs(maxY - minY) + 20,
      })
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
        <ShapeWrapper key={index} selectedTool={selectedTool} ShapeComponent={AnimatedRec} initialSize={{w:shape.w, h:shape.h}} scale={scale} finalPosition={{x:shape.x, y:shape.y}} onClick={(event) => handleShapeClick(shape.id, event)}/>
      ))}

       {/* Render the shape being drawn */}
       {drawing && currentShape && (
          <ShapeWrapper selectedTool={selectedTool} ShapeComponent={AnimatedRec} initialSize={{w:currentShape.width / scale, h:currentShape.height / scale}} scale={scale} finalPosition={{x:currentShape.x / scale, y:currentShape.y / scale}} />
       )}

       {/* Selection Box */}
      {selectionDragBox && (
        <div
          style={{
            position: "absolute",
            top: `${selectionDragBox.y}px`,
            left: `${selectionDragBox.x}px`,
            width: `${selectionDragBox.width}px`,
            height: `${selectionDragBox.height}px`,
            backgroundColor: "rgba(0, 120, 215, 0.2)",
            border: "2px solid rgb(0, 68, 140)",
            pointerEvents: "none",
          }}
        ></div>
      )}

        {selectionBox && (
        <div
          onMouseDown={handleMouseDownSelectionBox}
          style={{
            position: "absolute",
            top: `${selectionBox.y * scale}px`,
            left: `${selectionBox.x * scale}px`,
            width: `${selectionBox.width * scale}px`,
            height: `${selectionBox.height * scale}px`,
            backgroundColor: "rgba(0, 120, 215, 0.2)",
            border: "2px dotted rgb(0, 68, 140)",
            cursor: "grab"
          }}
        >
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
            onMouseDown={handleMouseDownBottomRight}
            style={{
              position: 'absolute',
              bottom: '-5px',
              right: '-5px',
              width: '10px',
              height: '10px',
              backgroundColor: 'white',
              border: '1px solid black',
              borderRadius: '50%',
              cursor: 'nwse-resize',
            }}
          ></div>

        </div>
      )}

      {scale}
    </div>
  );
}
