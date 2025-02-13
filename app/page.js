"use client";

import React, { useState, useEffect, useRef } from "react";
import ShapeWrapper from "@/components/ShapeWrapper";
import Toolbar from "@/components/Toolbar";
import ZoomToolbar from "@/components/ZoomToolbar";
import ShapeToolbar from "@/components/ShapeToolbar";
import ShapeSettings from "@/components/ShapeSettings";
import { getImageFromIndexedDB, saveImageToIndexedDB } from "@/utils/indexedDBHelper";
import BottomToolbar from "@/components/BottomToolbar";

export default function Home() {
  const defaultShapes = [
    {id: 1, x: 100, y: 150, w: 100, h: 170, component: "AnimatedRec", selected: false, settings: {animationSpeed: "fast", shapeColor: "#626262", borderColor: "#14f4bc"}},
    {id: 2, x: 400, y: 250, w: 130, h: 170, component: "AnimatedRec", selected: false, settings: {animationSpeed: "fast", shapeColor: "#000000", borderColor: "#e10f4e"}}
  ]

  const defaultSettings = {
    "AnimatedRec": {animationSpeed: "fast", shapeColor: "#2a2a2a", borderColor: "#51b39a"},
    "Cube3d": {animationSpeed: "fast", shapeColor: "#00ee00"}
  }


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

  const [boardColor, setBoardColor] = useState(() => {
    const savedOffset = localStorage.getItem("boardColor");
    return savedOffset ? JSON.parse(savedOffset) : "#232323";
  });

  const universalMousePosition = useRef({ x: 0, y: 0 });

  const [isPanning, setIsPanning] = useState(false);

  const [selectedTool, setSelectedTool] = useState('');

  const [drawing, setDrawing] = useState(false); 
  const [currentShape, setCurrentShape] = useState(null);

  const [selectionDragBox, setSelectionDragBox] = useState(null);
  const [selectionBox, setSelectionBox] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const [shapeToCreate, setShapeToCreate] = useState("AnimatedRec");

  const [selectedShape, setSelectedShape] = useState(null);

  const [pasteImage, setPasteImage] = useState(null);
  const [pasteImageId, setPasteImageId] = useState(null);

  const isResizing = useRef(false);
  const isDraggingSelectionBox = useRef(false);
  const initialSize = useRef(null);

  const [clipboard, setClipboard] = useState([]);

  const [isFreezeScreenSelected, setIsFreezeScreenSelected] = useState(false);

  const [colorPalette, setColorPalette] = useState(["#232323", "#990077", "#2f6b85"]);

  const updateColorPalette = () => {
    const shapeColors = allShapes.map(shape => shape.settings?.shapeColor);
    const borderColors = allShapes.map(shape => shape.settings?.borderColor);
    const getMostFrequentColor = (colors) => {
      const countMap = colors.reduce((acc, color) => {
        if (color) {
          acc[color] = (acc[color] || 0) + 1;
        }
        return acc;
      }, {});
      return Object.keys(countMap).reduce((a, b) => countMap[a] >= countMap[b] ? a : b);
    };
  
    const mostUsedShapeColor = getMostFrequentColor(shapeColors);
    const mostUsedBorderColor = getMostFrequentColor(borderColors);

    setColorPalette([boardColor, mostUsedShapeColor, mostUsedBorderColor]);
  };

  const [isCtrlPressed, setIsCtrlPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey) setIsCtrlPressed(true);
    };

    const handleKeyUp = (event) => {
      if (!event.ctrlKey || event.metaKey) setIsCtrlPressed(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }


  useEffect(() => {
    localStorage.setItem("shapes", JSON.stringify(allShapes));
    localStorage.setItem("scale", JSON.stringify(scale));
    localStorage.setItem("offset", JSON.stringify(offset));
    localStorage.setItem("boardColor", JSON.stringify(boardColor));
  }, [allShapes, scale, offset]);

  const pushToHistory = () => {
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
        } else if (event.key === "y") {
          event.preventDefault(); // Prevent default cut action
          redo(event);
        } else if (event.key === "c") {
          const selectedShapes = allShapes.filter(shape => shape.selected);
          setClipboard(selectedShapes);
        } else if (event.key === "x") {
          const selectedShapes = allShapes.filter(shape => shape.selected);
          setClipboard(selectedShapes);
          setAllShapes(allShapes.filter(shape => !shape.selected));
          setSelectionBox(null);
        } else if (event.key === "v") {
          if (clipboard.length > 0) {

            const newShapes = clipboard.map(shape => ({
              ...shape,
              id: generateUniqueId(),
              x: xScreenToWorld(universalMousePosition.current.x) - shape.w / 2,
              y: yScreenToWorld(universalMousePosition.current.y) - shape.h / 2,
              selected: false
            }));
            setAllShapes(prevShapes => [...prevShapes, ...newShapes]);
            pushToHistory();
          }
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
      const newScale = Math.min(Math.max(prevScale * zoomFactor, 0.02), 16); // Clamp the scale

      setOffset((prevOffset) => {
        
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

  const resetZoom = () => {
    setScale((prevScale) => {
      const newScale = 1;
      const xCenter = window.innerWidth / 2;
      const yCenter = window.innerHeight / 2;

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
    if (e.ctrlKey || e.metaKey) {
      const yDiff = e.deltaY > 0 ? -1 : 1;
      setOffset((prevOffset) => {
        // Adjust the offset to keep the mouse pointer fixed relative to content

        const newOffsetX = prevOffset.x;
        const newOffsetY = prevOffset.y + yDiff / scale * 26;

        return { x: newOffsetX, y: newOffsetY};
      });

    }
    else if (e.shiftKey) {
      const xDiff = e.deltaX > 0 ? -1 : 1;
      setOffset((prevOffset) => {
        // Adjust the offset to keep the mouse pointer fixed relative to content

        const newOffsetX = prevOffset.x + xDiff / scale * 26;
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

  const fitScreen = () => {
    var minX = Infinity;
    var minY = Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;

    allShapes.forEach((shape) => {
      minX = Math.min(minX, shape.x);
      minY = Math.min(minY, shape.y);
      maxX = Math.max(maxX, shape.x + shape.w);
      maxY = Math.max(maxY, shape.y + shape.h);
    });

    const boundingWidth = maxX - minX;
    const boundingHeight = maxY - minY;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const scaleX = screenWidth / boundingWidth;
    const scaleY = screenHeight / boundingHeight;
    const scale = Math.min(scaleX, scaleY);

    const offsetX =  minX;
    const offsetY = minY;
    setScale(scale);
    setOffset({ x: offsetX, y: offsetY });
  }

  const freezeScreen = () => {
    if (!isFreezeScreenSelected) {
      setSelectedTool('pan');
      setIsFreezeScreenSelected(true);  
    } else {
      setIsFreezeScreenSelected(false); 
    }
  }

  const initialPan = useRef(null);
  const initialText = useRef(null);

  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingText, setCurrentTypingText] = useState("");

  const textInputRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    isResizing.current = false;
    isDraggingSelectionBox.current = false;

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

      console.log(defaultSettings[shapeToCreate])
      setCurrentShape({id: generateUniqueId() ,x: xScreenToWorld(startX), y: yScreenToWorld(startY), w: 0, h: 0, selected: false, component: shapeToCreate, settings: defaultSettings[shapeToCreate] });
    }
    else if (selectedTool == 'text') {
      const isCtrlPressed = e.ctrlKey || e.metaKey;
      if (isCtrlPressed) return;

      if (isTyping) {
        const { width, height } = textInputRef.current.getBoundingClientRect();
        setIsTyping(false);
        const newShape = {
          id: Date.now(),
          x: initialText.current.x,
          y: initialText.current.y,
          w: textInputRef.current.scrollWidth / scale,
          h: textInputRef.current.scrollHeight / scale,
          component: "SimpleText",
          selected: false,
          settings: { text: currentTypingText, fontSizeRate: initialText.current.settings.fontSize / (width + height) * 2 , textColor: "#fff" }
      };

      setAllShapes((prevShapes) => [...prevShapes, newShape]);
      pushToHistory()
        return;
      }

      initialText.current = {
        x: xScreenToWorld(e.clientX),
        y: yScreenToWorld(e.clientY),
        initialOffset: offset,
        settings: {
          fontSize: 16
        }
      }

      setCurrentTypingText("");
      setIsTyping(true);
    }

  };

  const handleMouseMove = (e) => {
    universalMousePosition.current = { x: e.clientX, y: e.clientY };
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
      if (isResizing.current) return;
      if (isDraggingSelectionBox.current) return;

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
          pushToHistory();
        }

      }
      setSelectionDragBox(null);

      if (!isAnySelected) {
        setSelectionBox(null);
        setSelectedShape(null);
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
          pushToHistory();
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


  const handleCornerMouseDown = (e, corner) => {
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
      corner,
    };

    document.addEventListener("mousemove", handleCornerMouseMove);
    document.addEventListener("mouseup", handleCornerMouseUp);
  };

  const handleCornerMouseMove = (e) => {
    if (!isResizing.current || !initialSize.current) return;

    const { startX, startY, initialWidth, initialHeight, initialX, initialY, initialAllShapes, corner } = initialSize.current;

    let newWidth = initialWidth;
    let newHeight = initialHeight;
    let newX = initialX;
    let newY = initialY;
    
    // Calculate the new size of the container
    // var newWidth = Math.max(initialWidth + (e.clientX - startX) / scale, 1);
    // var newHeight = Math.max(initialHeight + (e.clientY - startY) / scale, 1);
    const deltaX = (e.clientX - startX) / scale;
    const deltaY = (e.clientY - startY) / scale;
  
    if (corner === "bottomRight") {
      newWidth = Math.max(initialWidth + deltaX, 1);
      newHeight = Math.max(initialHeight + deltaY, 1);
    } else if (corner === "bottomLeft") {
      newWidth = Math.max(initialWidth - deltaX, 1);
      newHeight = Math.max(initialHeight + deltaY, 1);
      newX = initialX + deltaX;
    } else if (corner === "topRight") {
      newWidth = Math.max(initialWidth + deltaX, 1);
      newHeight = Math.max(initialHeight - deltaY, 1);
      newY = initialY + deltaY;
    } else if (corner === "topLeft") {
      newWidth = Math.max(initialWidth - deltaX, 1);
      newHeight = Math.max(initialHeight - deltaY, 1);
      newX = initialX + deltaX;
      newY = initialY + deltaY;
    } else if (corner === "topEdge") {
      newHeight = Math.max(initialHeight - deltaY, 1);
      newY = initialY + deltaY;
    } else if (corner === "bottomEdge") {
      newHeight = Math.max(initialHeight + deltaY, 1);
    } else if (corner === "rightEdge") {
      newWidth = Math.max(initialWidth + deltaX, 1);
    } else if (corner === "leftEdge") {
      newWidth = Math.max(initialWidth - deltaX, 1);
      newX = initialX + deltaX;
    }

    if (e.ctrlKey || e.metaKey) {
      var factor = 1;
      if (corner == "topRight" || corner == "bottomLeft") factor = -1;

      const commonPart = (factor * (e.clientX - startX) + (e.clientY - startY)) / 2 / scale;
      const deltaX = commonPart;
      const deltaY = commonPart * initialHeight/initialWidth;
      if (corner == "topLeft") {
        newWidth = Math.max(initialWidth - deltaX, 1);
        newHeight = Math.max(initialHeight - deltaY, 1);
        newX = initialX + deltaX;
        newY = initialY + deltaY;
      } else if (corner == "topRight") {
        newWidth = Math.max(initialWidth - deltaX, 1);
        newHeight = Math.max(initialHeight - deltaY, 1);
        newX = initialX;
        newY = initialY + deltaY;
      } else if (corner == "bottomRight") {
        newWidth = Math.max(initialWidth + deltaX, 1);
        newHeight = Math.max(initialHeight + deltaY, 1);
        newX = initialX;
        newY = initialY;
      } else if (corner == "bottomLeft") {
        newWidth = Math.max(initialWidth + deltaX, 1);
        newHeight = Math.max(initialHeight + deltaY, 1);
        newX = initialX - deltaX;
        newY = initialY;
      }
    }

    // Calculate resize ratios
    const widthRatio = newWidth / initialWidth;
    const heightRatio = newHeight / initialHeight;

    // Update elements based on resize ratios
    const resizedItems = initialAllShapes.map((shape) => ({
      ...shape,
      x: shape.selected ? Math.round((shape.x - initialX) * widthRatio + newX) : shape.x,
      y: shape.selected ? Math.round((shape.y - initialY) * heightRatio + newY) : shape.y,
      w: shape.selected ? Math.round(shape.w * widthRatio) : shape.w,
      h: shape.selected ? Math.round(shape.h * heightRatio) : shape.h,
    }));

    // Update state
    setSelectionBox({ x: newX, y: newY, width: newWidth, height: newHeight });
    setAllShapes(resizedItems);
  };


  const handleCornerMouseUp = () => {
    pushToHistory();
    document.removeEventListener("mousemove", handleCornerMouseMove);
    document.removeEventListener("mouseup", handleCornerMouseUp);
  };


  const handleMouseDownSelectionBox = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
    pushToHistory();
    // isDraggingSelectionBox.current = false;
    document.removeEventListener("mousemove", handleMouseMoveSelectionBox);
    document.removeEventListener("mouseup", handleMouseUpSelectionBox);

  }

  const handleTextMouseDown = (id, e) => {
    if (selectedTool == 'text') {
      e.stopPropagation();
      const shape = allShapes.filter((shape) => shape.id === id)[0];
      if (shape.component != 'SimpleText') return;
      setAllShapes((prevShapes) => prevShapes.filter((shape) => shape.id !== id));
      pushToHistory()
      console.log(shape)

      initialText.current = {
        ...shape,
        settings: {
          ...shape.settings,
          fontSize: shape.settings.fontSizeRate * (shape.w + shape.h) / 2 * scale,
        },
      }

      setCurrentTypingText(shape.settings.text);
      setIsTyping(true);
    }
  };

  const handleTextMouseUp = (e) => {
    if (selectedTool == 'text') {
      e.stopPropagation();
    }
  }

  const handleShapeClick = (id, e) => {
    e.stopPropagation();
    if (selectedTool == 'select') {
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

        if (!isCtrlPressed) {
          const shape = allShapes.filter((shape) => shape.id === id)[0];
          setSelectedShape(shape);
          console.log(shape);
        }

      setAllShapes(updateShapesWithSelect);
      pushToHistory();

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
    }
  };

  // Handle keydown event for the Delete key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        const selectedShapes = allShapes.filter((shape) => shape.selected);
        if (selectedShapes.length > 0)  {
          setAllShapes((prevShapes) => prevShapes.filter((shape) => !shape.selected));
          setSelectionBox(null);
          pushToHistory();
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

  const changeShapeSettingByName = (name, value) => {
    setAllShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === selectedShape.id
          ? { ...shape, settings: { ...shape.settings, [name]: value } }
          : shape
      )
    );
  };

  const handleImagePaste = (e) => {
    e.preventDefault()
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image")) {
        const file = item.getAsFile();
        storeImage(file);
        break;
      }
    }
  }

  const storeImage = async (file) => {
    const id = await saveImageToIndexedDB(file);
    setPasteImageId(id);
  };

  const loadImageAsBase64 = async (id) => {
    const file = await getImageFromIndexedDB(id);
    if (!file) {
      console.error("No file found for ID:", id);
      return null;
    }
  
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // Return base64 string
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };


  useEffect(() => {
    window.addEventListener("paste", handleImagePaste);
    return () => window.removeEventListener("paste", handleImagePaste);
  }, []);

  useEffect(() => {
    const pasteImageFunction = async () => {
  
      if (pasteImageId) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
  
        const img = new Image();
        img.src = await loadImageAsBase64(pasteImageId); // Ensure we get the image URL
        
        img.onload = () => {
          
          const imageShape = {
            id: generateUniqueId(),
            x: xScreenToWorld(centerX) - img.width / 2,
            y: yScreenToWorld(centerY) - img.height / 2,
            w: img.width,
            h: img.height,
            selected: false,
            component: 'SimpleImage',
            settings: { imageId: pasteImageId },
          };
  
          console.log(imageShape);
          setAllShapes((prev) => [...prev, imageShape]);
          pushToHistory();
          setPasteImage(null);
        };
  
        img.onerror = (err) => {
          console.error("Failed to load image:", err);
        };
      }
    };
  
    pasteImageFunction();
  }, [pasteImageId]);


  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image")) {
        storeImage(file);
      }
    }
  };
  
  // Prevent default behavior for drag over (so the page doesn't open the file)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);
    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  const stopPropagation = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }


  useEffect(() => {
    if (isTyping && textInputRef.current) {
        textInputRef.current.focus();
    }
  }, [isTyping]);

  return (
    <div
    style={{
      position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor:`${boardColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor:
          selectedTool === "pan"
            ? "move"
            : selectedTool === "text"
            ? isCtrlPressed
              ? "text"
              : "text"
            : "default",
      }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {!isFreezeScreenSelected &&
      <Toolbar
        setSelectedTool={setSelectedTool}
        selectedTool={selectedTool}
        undo={undo}
        redo={redo}
        history={history}
        redoStack={redoStack}
        storeImage={storeImage}
      />
      }

      {selectedTool === 'shape' &&
        <ShapeToolbar setShapeToCreate={setShapeToCreate} shapeToCreate={shapeToCreate}/>
      }

      {selectedShape && selectedTool === 'select' && !isFreezeScreenSelected &&
        <ShapeSettings selectedShape={selectedShape} changeShapeSettingByName={changeShapeSettingByName} updateColorPalette={updateColorPalette} colorPalette={colorPalette} />
      }

      <ZoomToolbar scale={scale} zoomInOut={zoomInOut} resetZoom={resetZoom} fitScreen={fitScreen} freezeScreen={freezeScreen} isFreezeScreenSelected={isFreezeScreenSelected}/>
      
      { !isFreezeScreenSelected && 
        <BottomToolbar boardColor={boardColor} setBoardColor={setBoardColor} />
      }
      
      {allShapes.map((shape, index) => (
        <ShapeWrapper
          key={index}
          selectedTool={selectedTool}
          ShapeComponent={shape.component}
          initialSize={{w:shape.w, h:shape.h}}
          scale={scale}
          offset={offset}
          finalPosition={{x:shape.x, y:shape.y}}
          onClick={(event) => handleShapeClick(shape.id, event)}
          shapeSettings={shape.settings}
          onMouseDown={(event) => handleTextMouseDown(shape.id, event)}
          onMouseUp={(event) => handleTextMouseUp(event)}
        />
      ))}

       {/* Render the shape being drawn */}
       {drawing && currentShape && (
          <ShapeWrapper selectedTool={selectedTool} ShapeComponent={currentShape.component} initialSize={{w:currentShape.w, h:currentShape.h}} scale={scale} offset={offset} finalPosition={{x:currentShape.x, y:currentShape.y}} />
       )}

      {isTyping && (
         
      <div
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => {
          setCurrentTypingText(e.target.innerText);
        }}
        ref={textInputRef}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          left: `${xWorldToScreen(initialText.current.x)}px`,
          top: `${yWorldToScreen(initialText.current.y)}px`,
          minWidth: "10px",
          minHeight: "30px",
          padding: "5px",
          fontSize: `${initialText.current.settings.fontSize}px`,
          color: "black",
          border: "1px solid #000",
          background: "white",
          outline: "none",
          resize: "none",
          overflow: "hidden",
          wordBreak: "break-word",
          display: "inline-block",
          whiteSpace: "pre-wrap",
          width: "fit-content",
          height: "fit-content"
        }}
      >
        {initialText.current.settings.text}
      </div>
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
            backgroundColor: "rgba(0, 68, 140, 0.09)",
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
            top: `${(selectionBox.y - offset.y - 1) * scale}px`,
            left: `${(selectionBox.x - offset.x - 1) * scale}px`,
            width: `${(selectionBox.width + 2) * scale}px`,
            height: `${(selectionBox.height + 2) * scale}px`,
            backgroundColor: "rgba(0, 118, 215, 0.05)",
            border: "2px dotted rgb(0, 68, 140)",
            cursor: "grab"
          }}
        >
          {/* Top-left corner */}
          <div
            onMouseDown={(e) => handleCornerMouseDown(e, "topLeft")}
            style={{
              position: 'absolute',
              top: '-5px',
              left: '-5px',
              width: '10px',
              height: '10px',
              backgroundColor: 'white',
              border: '1px solid black',
              borderRadius: '10%',
              cursor: 'nwse-resize',
            }}
          />
          <div
            onMouseDown={(e) => handleCornerMouseDown(e, "topEdge")}
            style={{
              position: 'absolute',
              top: '-2px',
              width: '100%',
              height: '2px',
              backgroundColor: 'white',
              cursor: 'ns-resize',

            }}
          />
          {/* Top-right corner */}
          <div
            onMouseDown={(e) => handleCornerMouseDown(e, "topRight")}
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              width: '10px',
              height: '10px',
              backgroundColor: 'white',
              border: '1px solid black',
              borderRadius: '10%',
              cursor: 'nesw-resize',
            }}
          />
          <div
            onMouseDown={(e) => handleCornerMouseDown(e, "rightEdge")}
            style={{
              position: 'absolute',
              right: '-2px',
              height: '100%',
              width: '2px',
              backgroundColor: 'white',
              cursor: 'ew-resize',
            }}
          />
          {/* Bottom-right corner */}
          <div
            onMouseDown={(e) => handleCornerMouseDown(e, "bottomRight")}
            style={{
              position: 'absolute',
              bottom: '-5px',
              right: '-5px',
              width: '10px',
              height: '10px',
              backgroundColor: 'white',
              border: '1px solid black',
              borderRadius: '10%',
              cursor: 'nwse-resize',
            }}
          ></div>
          <div
            onMouseDown={(e) => handleCornerMouseDown(e, "bottomEdge")}
            style={{
              position: 'absolute',
              bottom: '-2px',
              width: '100%',
              height: '2px',
              backgroundColor: 'white',
              cursor: 'ns-resize',
            }}
          />
          {/* Bottom-left corner */}
          <div
            onMouseDown={(e) => handleCornerMouseDown(e, "bottomLeft")}
            style={{
              position: 'absolute',
              bottom: '-5px',
              left: '-5px',
              width: '10px',
              height: '10px',
              backgroundColor: 'white',
              border: '1px solid black',
              borderRadius: '10%',
              cursor: 'nesw-resize',
            }}
          />
          <div
            onMouseDown={(e) => handleCornerMouseDown(e, "leftEdge")}
            style={{
              position: 'absolute',
              left: '-2px',
              height: '100%',
              width: '2px',
              backgroundColor: 'white',
              cursor: 'ew-resize',
            }}
          />
          

        </div>
      )}

      {scale}
    </div>
  );
}
