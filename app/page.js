"use client";
import Image from "next/image";

import WaveRectangle from "@/components/WaveRectangle";
import AnimatedRec from "@/components/shapes/AnimatedRec";
import React, { useState, useEffect, useRef } from "react";
import ShapeWrapper from "@/components/ShapeWrapper";
import Toolbar from "@/components/Toolbar";
import ZoomToolbar from "@/components/ZoomToolbar";
import Cube3d from "@/components/shapes/Cube3d";
import ShapeToolbar from "@/components/ShapeToolbar";

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

  const [isPanning, setIsPanning] = useState(false);

  const [selectedTool, setSelectedTool] = useState('');

  const [drawing, setDrawing] = useState(false); 
  const [currentShape, setCurrentShape] = useState(null);

  const [selectionDragBox, setSelectionDragBox] = useState(null);
  const [selectionBox, setSelectionBox] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const [shapeToCreate, setShapeToCreate] = useState({component: AnimatedRec});

  useEffect(() => {
    localStorage.setItem("shapes", JSON.stringify(allShapes));
    localStorage.setItem("scale", JSON.stringify(scale));
    localStorage.setItem("offset", JSON.stringify(offset));
  }, [allShapes, scale, offset]);

  const pushToHistory = (newShapes) => {
    console.log('push to history called')
    // Save the current state to history and clear the redo stack
    setHistory((prev) => [...prev, allShapes]);
    setRedoStack([]);
  };

  const undo = (e) => {
    console.log('undo called')
    e.stopPropagation();
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1)); // Remove the last state
      setRedoStack((prev) => [allShapes, ...prev]); // Save the current state in redo stack
      setAllShapes(previousState);
      calculateSelectionBox(previousState);
    }
  };

  const redo = (e) => {
    e.stopPropagation();
    if (redoStack.length > 0) {
      const nextState = redoStack[0];
      
      setRedoStack((prev) => prev.slice(1)); // Remove the first state
      setHistory((prev) => [...prev, allShapes]); // Save the current state in history
      setAllShapes(nextState);
      calculateSelectionBox(nextState);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === "z") {
          event.preventDefault(); // Prevent default browser undo
          undo(event);
        } else if (event.key === "x") {
          event.preventDefault(); // Prevent default cut action
          redo(event);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo]);

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
      setSelectionBox(null);
      setSelectionDragBox([]);
    }
  }, [selectedTool])

  const zoomInOut = (zoomFactor, xCenter, yCenter) => {
    setScale((prevScale) => {
      const newScale = Math.min(Math.max(prevScale * zoomFactor, 0.4), 3); // Clamp the scale

      setOffset((prevOffset) => {
        // Adjust the offset to keep the mouse pointer fixed relative to content
        
        const m_before_zoom_x = xCenter / prevScale + prevOffset.x;
        const m_before_zoom_y = yCenter / prevScale + prevOffset.y;

        const m_after_zoom_x = xCenter / newScale + prevOffset.x;
        const m_after_zoom_y = yCenter / newScale + prevOffset.y;

        const newOffsetX = prevOffset.x + (m_before_zoom_x - m_after_zoom_x) / 2;
        const newOffsetY = prevOffset.y + (m_before_zoom_y - m_after_zoom_y) / 2;

        return { x: newOffsetX, y: newOffsetY};
      });

      return newScale;
    });
  }

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.ctrlKey || e.metaKey) {
      const yDiff = e.deltaY > 0 ? -1 : 1;
      setOffset((prevOffset) => {
        // Adjust the offset to keep the mouse pointer fixed relative to content

        const newOffsetX = prevOffset.x;
        const newOffsetY = prevOffset.y + yDiff / scale * 6;

        return { x: newOffsetX, y: newOffsetY};
      });

    }
    else if (e.shiftKey) {
      const xDiff = e.deltaX > 0 ? -1 : 1;
      setOffset((prevOffset) => {
        // Adjust the offset to keep the mouse pointer fixed relative to content

        const newOffsetX = prevOffset.x + xDiff / scale * 6;
        const newOffsetY = prevOffset.y;

        return { x: newOffsetX, y: newOffsetY};
      });

    }
    else {
      // const scaleDiff = e.deltaY > 0 ? -0.05 : 0.05;
      const scaleDiff = e.deltaY > 0 ? 0.9 : 1.1;
      zoomInOut (scaleDiff, e.clientX, e.clientY);
    }
  };



  const initialPan = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();

    if (selectedTool == 'pan') {
      setIsPanning(true);
      initialPan.current = {
        startX: e.clientX,
        startY: e.clientY,
        initialOffset: offset,
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
    else if (selectedTool == 'shape') {
      const startX = e.clientX;
      const startY = e.clientY;

      setDrawing(true);
      const uniqueId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

      setCurrentShape({id: uniqueId ,x: xScreenToWorld(startX), y: yScreenToWorld(startY), w: 0, h: 0, selected: false });
    }

  };

  const handleMouseMove = (e) => {
    if (selectedTool == 'pan') {
      if (!isPanning || !initialPan.current) return;

      const { startX, startY, initialOffset } = initialPan.current;
      const xDiff = e.clientX - startX;
      const yDiff = e.clientY - startY;
      setOffset((prev) => ({
        x: initialOffset.x - xDiff / scale,
        y: initialOffset.y - yDiff / scale,
      }))

    }
    else if (selectedTool == 'select') {
      if (!isSelecting) return;
      if (isResizing.current) return;
      if (isDraggingSelectionBox.current) {
        setSelectionDragBox(null);
        return;
      };
      console.log("inside mouse move selection")
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
    else if (selectedTool == 'shape') {
      if (!drawing || !currentShape) return;
      const currentX = xScreenToWorld(e.clientX);
      const currentY = yScreenToWorld(e.clientY);
  
      const width = currentX - currentShape.x;
      const height = currentY - currentShape.y;

      const newShape = {
        ...currentShape,
        w: Math.abs(width),
        h: Math.abs(height),
        x: width < 0 ? currentX : currentShape.x,
        y: height < 0 ? currentY : currentShape.y,
      };

      setCurrentShape((prev) => {
        if (
          prev.w === newShape.w &&
          prev.h === newShape.h &&
          prev.x === newShape.x &&
          prev.y === newShape.y
        ) {
          return prev;
        }
        return newShape;
      });
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
      var maxX = -Infinity;
      var maxY = -Infinity;
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

        const previousIsAnySelected = allShapes.some((shape) => shape.selected);
        if (previousIsAnySelected || isAnySelected) {
          setAllShapes(updateShapes);
          console.log('push to hisotry inside mouseup')
          pushToHistory(updateShapes);
        }

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
    else if (selectedTool == 'shape') {
      if (drawing && currentShape) {
        if (currentShape.w > 0 && currentShape.h > 0) {
          setAllShapes((prev) => [...prev, currentShape]);
          pushToHistory(currentShape);
        }
        setDrawing(false);
        setCurrentShape(null);
      }
    }
  };


  const calculateSelectionBox = (shapes) => {
    var minX = Infinity;
    var minY = Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;
    var isAnySelected = false;
    shapes.filter((shape) => shape.selected).forEach((shape) => {
      
      isAnySelected = true;
      minX = Math.min(minX, shape.x);
      minY = Math.min(minY, shape.y);
      maxX = Math.max(maxX, shape.x + shape.w);
      maxY = Math.max(maxY, shape.y + shape.h);

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
  }

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
    var newWidth = Math.max(initialWidth + (e.clientX - startX) / scale, 1);
    var newHeight = Math.max(initialHeight + (e.clientY - startY) / scale, 1);

    if (e.ctrlKey || e.metaKey) {
      newWidth = Math.max(initialWidth + ((e.clientX - startX) + (e.clientY - startY)) / 2 / scale, 1);
      newHeight = Math.max(initialHeight + ((e.clientX - startX) + (e.clientY - startY)) / 2 / scale, 1);
    }

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
    pushToHistory(allShapes);
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
    console.log("mouse up selection")
    pushToHistory(allShapes);
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
    pushToHistory(updateShapesWithSelect);

    var minX = Infinity;
    var minY = Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;
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

  // Handle keydown event for the Delete key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete") {
        const selectedShapes = allShapes.filter((shape) => shape.selected);
        if (selectedShapes.length > 0)  {
          setAllShapes((prevShapes) => prevShapes.filter((shape) => !shape.selected));
          setSelectionBox(null);
          pushToHistory(allShapes);
        }
      }
    };

    // Attach event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [allShapes]);

  const stopPropagation = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

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
      <Toolbar
        setSelectedTool={setSelectedTool}
        selectedTool={selectedTool}
        undo={undo}
        redo={redo}
        history={history}
        redoStack={redoStack}
      />

      <ShapeToolbar setShapeToCreate={setShapeToCreate}/>

      <ZoomToolbar scale={scale} zoomInOut={zoomInOut} />
      <Cube3d />
      
      {allShapes.map((shape, index) => (
        <ShapeWrapper key={index} selectedTool={selectedTool} ShapeComponent={shapeToCreate.component} initialSize={{w:shape.w, h:shape.h}} scale={scale} offset={offset} finalPosition={{x:shape.x, y:shape.y}} onClick={(event) => handleShapeClick(shape.id, event)}/>
      ))}
<div
  style={{
    position: "absolute",
    top: `0px`,
    left: `0px`,
    width: `150px`,
    height: `150px`,
  }}
>

</div>
       {/* Render the shape being drawn */}
       {drawing && currentShape && (
          <ShapeWrapper selectedTool={selectedTool} ShapeComponent={shapeToCreate.component} initialSize={{w:currentShape.w, h:currentShape.h}} scale={scale} offset={offset} finalPosition={{x:currentShape.x, y:currentShape.y}} />
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
