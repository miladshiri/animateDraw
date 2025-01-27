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
  }, []);

  // Load scale state from localStorage or fallback to default
  const [scale, setScale] = useState(() => {
    const savedScale = localStorage.getItem("scale");
    return savedScale ? JSON.parse(savedScale) : 1;
  });

  // Load scale state from localStorage or fallback to default
  const [offset, setOffset] = useState(() => {
    const savedOffset = localStorage.getItem("offset");
    return savedOffset ? JSON.parse(savedOffset) : {x:0, y:0};
  });

  useEffect(() => {
    localStorage.setItem("shapes", JSON.stringify(allShapes));
    localStorage.setItem("scale", JSON.stringify(scale));
    localStorage.setItem("offset", JSON.stringify(offset));
  }, [allShapes, scale, offset]);
  
  const [isPanning, setIsPanning] = useState(false);

  const [selectedTool, setSelectedTool] = useState('');

  const [drawing, setDrawing] = useState(false); 
  const [currentShape, setCurrentShape] = useState(null);

  const [selectionDragBox, setSelectionDragBox] = useState(null);
  const [selectionBox, setSelectionBox] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);


  const worldToScreen = ({x, y}) => {
    return {
      x: (x - offset.x) * scale,
      y: (y - offset.y) * scale,
    }
  }

  const xWorldToScreen = (x) => {
    return (x - offset.x) * scale;
  }

  const yWorldToScreen = (y) => {
    return (y - offset.y) * scale;
  }

  const xScreenToWorld = (x) => {
    return (x / scale ) + offset.x;
  }

  const yScreenToWorld = (y) => {
    return (y / scale ) + offset.y;
  }


  useEffect(() => {
    if (selectedTool != 'selected') {
      setSelectionBox({x:0, y:0, width:0, height:0});
      setSelectionDragBox([]);
    }
  }, [selectedTool])


  const handleWheel = (e) => {
    e.preventDefault();
  
    // const scaleDiff = e.deltaY > 0 ? -0.05 : 0.05;
    const scaleDiff = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((prevScale) => {
      const newScale = Math.min(Math.max(prevScale * scaleDiff, 0.4), 3); // Clamp the scale

      setOffset((prevOffset) => {
        // Adjust the offset to keep the mouse pointer fixed relative to content
        
        const m_before_zoom_x = e.clientX / prevScale + prevOffset.x;
        const m_before_zoom_y = e.clientY / prevScale + prevOffset.y;

        const m_after_zoom_x = e.clientX / newScale + prevOffset.x;
        const m_after_zoom_y = e.clientY / newScale + prevOffset.y;

        const newOffsetX = prevOffset.x + (m_before_zoom_x - m_after_zoom_x) / 2;
        const newOffsetY = prevOffset.y + (m_before_zoom_y - m_after_zoom_y) / 2;

        return { x: newOffsetX, y: newOffsetY};
      });
  
      return newScale;
    });
  };

    const initialPan = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();

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

      setCurrentShape({id: uniqueId ,x: xScreenToWorld(startX), y: yScreenToWorld(startY), width: 0, height: 0, selected: false });
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
        const currentX = xScreenToWorld(e.clientX);
        const currentY = yScreenToWorld(e.clientY);
    
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
          const shapeScreenCoordinates = worldToScreen({ x: shape.x, y: shape.y });

          if (
            box.x < xWorldToScreen(shape.x) &&
            box.x + box.width > xWorldToScreen(shape.x) + shape.w * scale &&
            box.y < yWorldToScreen(shape.y) &&
            box.y  + box.height  > yWorldToScreen(shape.y) + shape.h * scale
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
      }
      setSelectionDragBox(null);

      if (!isAnySelected) {
        setSelectionBox(null);
      }
      else {
        setSelectionBox({
          x: minX,
          y: minY,
          width: Math.abs(maxX - minX),
          height: Math.abs(maxY - minY),
        })
      }
    }
    else if (selectedTool == 'square') {
      if (drawing && currentShape) {
        setAllShapes((prev) => [...prev, {
          id: currentShape.id,
          x: currentShape.x,
          y: currentShape.y,
          w: currentShape.width,
          h: currentShape.height,
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
    setSelectionBox({ x: selectionBox.x + xDiff / scale , y: selectionBox.y + yDiff / scale , width: selectionBox.width, height: selectionBox.height });
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
        x: minX,
        y: minY,
        width: Math.abs(maxX - minX),
        height: Math.abs(maxY - minY),
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
        backgroundColor:"rgb(7, 23, 34)",
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
        <ShapeWrapper key={index} selectedTool={selectedTool} ShapeComponent={AnimatedRec} initialSize={{w:shape.w, h:shape.h}} scale={scale} offset={offset} finalPosition={{x:shape.x, y:shape.y}} onClick={(event) => handleShapeClick(shape.id, event)}/>
      ))}

       {/* Render the shape being drawn */}
       {drawing && currentShape && (
          <ShapeWrapper selectedTool={selectedTool} ShapeComponent={AnimatedRec} initialSize={{w:currentShape.width, h:currentShape.height}} scale={scale} offset={offset} finalPosition={{x:currentShape.x, y:currentShape.y}} />
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
            backgroundColor: "rgba(0, 68, 140, 0.35)",
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
            top: `${(selectionBox.y - offset.y - 10) * scale}px`,
            left: `${(selectionBox.x - offset.x - 10) * scale}px`,
            width: `${(selectionBox.width + 20) * scale}px`,
            height: `${(selectionBox.height + 20) * scale}px`,
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
