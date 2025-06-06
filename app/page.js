"use client";

import React, { useState, useEffect, useRef } from "react";
import ShapeWrapper from "@/components/ShapeWrapper";
import Toolbar from "@/components/Toolbar";
import ZoomToolbar from "@/components/ZoomToolbar";
import ShapeToolbar from "@/components/ShapeToolbar";
import ShapeSettings from "@/components/ShapeSettings";
import { getImageFromIndexedDB, saveImageToIndexedDB } from "@/utils/indexedDBHelper";
import BottomToolbar from "@/components/BottomToolbar";
import { defaultSettings } from "@/components/shapeToComponentMapping";
import Image from 'next/image';
import LogoBar from "@/components/LogoBar";
import board1Template from "@/board_templates/board1.json";

export default function Home() {
  var defaultScale = board1Template.scale;
  var defaultOffset = board1Template.offset;
  const defaultBoardColor = board1Template.boardColor;
  const defaultShapes = board1Template.shapes;

  // Add window size logging
  useEffect(() => {
    

    // const handleResize = () => {
    //   console.log('Window dimensions after resize:', {
    //     width: window.innerWidth,
    //     height: window.innerHeight
    //   });
    // };

    // window.addEventListener('resize', handleResize);
    // return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [allShapes, setAllShapes] = useState([]);
  const [scale, setScale] = useState(defaultScale);
  const [offset, setOffset] = useState(defaultOffset);
  const [boardColor, setBoardColor] = useState(defaultBoardColor); 

  useEffect(() => {
    console.log('Window dimensions:', {
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Calculate content bounds from template shapes
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;
    
    defaultShapes.forEach(shape => {
      minX = Math.min(minX, shape.x);
      minY = Math.min(minY, shape.y);
      maxX = Math.max(maxX, shape.x + shape.w);
      maxY = Math.max(maxY, shape.y + shape.h);
    });

    // Calculate content dimensions
    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;

    // Add padding (1% on each side)
    const paddingX = contentWidth * 0.01;
    const paddingY = contentHeight * 0.01;

    // Account for toolbar height
    const toolbarHeight = 100;

    // Calculate scale to fit content with padding
    const scaleX = window.innerWidth / (contentWidth + 2 * paddingX);
    const scaleY = window.innerHeight / (contentHeight + 2 * paddingY);
    defaultScale = Math.min(scaleX, scaleY);

    // Center the content horizontally only, vertically align with top of shapes
    const emptySpaceX = window.innerWidth - (contentWidth * defaultScale);
    
    defaultOffset.x = minX - (emptySpaceX / 2 / defaultScale);
    defaultOffset.y = minY; // Start directly from where shapes begin

    const isFirstVisit = !localStorage.getItem("hasVisitedBefore");
    const savedShapes = localStorage.getItem("shapes");
    const savedScale = localStorage.getItem("scale");
    const savedOffset = localStorage.getItem("offset");
    const savedBoardColor = localStorage.getItem("boardColor");
  
    if (isFirstVisit) {
      // First time user - use template values
      setAllShapes(defaultShapes);
      setScale(defaultScale);
      setOffset(defaultOffset);
      setBoardColor(defaultBoardColor);
      localStorage.setItem("hasVisitedBefore", "true");
    } else {
      // Returning user - load their saved values
      if (savedShapes) setAllShapes(JSON.parse(savedShapes));
      if (savedScale) setScale(JSON.parse(savedScale));
      if (savedOffset) setOffset(JSON.parse(savedOffset));
      if (savedBoardColor) setBoardColor(JSON.parse(savedBoardColor));
    }
  }, []);

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
  
  const [inputTextScale, setInputTextScale] = useState({ x: 1, y: 1 });

  const [hiddenTextId, setHiddenTextid] = useState(null);

  const mouseDownPosition = useRef({ x: 0, y: 0 });


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
      const keys = Object.keys(countMap);
      if (keys.length === 0) return "#000000";
      return keys.reduce((a, b) => countMap[a] >= countMap[b] ? a : b);
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
          if (selectedShapes.length > 0) {
            const shapesText = JSON.stringify(selectedShapes);
            navigator.clipboard.writeText(shapesText);
          }
        } else if (event.key === "x") {
          const selectedShapes = allShapes.filter(shape => shape.selected);
          if (selectedShapes.length > 0) {
            const shapesText = JSON.stringify(selectedShapes);
            navigator.clipboard.writeText(shapesText);
            setAllShapes(allShapes.filter(shape => !shape.selected));
            setSelectionBox(null);
          }
        } else if (event.key === "v") {
          // First try to read as text (for shapes)
          navigator.clipboard.readText().then(text => {
            try {
              const pastedShapes = JSON.parse(text);
              if (Array.isArray(pastedShapes)) {
                // Calculate the center of the pasted shapes
                const centerX = pastedShapes.reduce((sum, shape) => sum + shape.x + shape.w/2, 0) / pastedShapes.length;
                const centerY = pastedShapes.reduce((sum, shape) => sum + shape.y + shape.h/2, 0) / pastedShapes.length;

                // Calculate the offset from the center to the mouse position
                const mouseX = xScreenToWorld(universalMousePosition.current.x);
                const mouseY = yScreenToWorld(universalMousePosition.current.y);
                const offsetX = mouseX - centerX;
                const offsetY = mouseY - centerY;

                // Create new shapes with adjusted positions
                const newShapes = pastedShapes.map(shape => ({
                  ...shape,
                  id: generateUniqueId(),
                  x: shape.x + offsetX,
                  y: shape.y + offsetY,
                  selected: false
                }));

                setAllShapes(prevShapes => [...prevShapes, ...newShapes]);
                pushToHistory();
              }
            } catch (e) {
              // If JSON parsing fails, try to read as image
              navigator.clipboard.read().then(clipboardItems => {
                for (const clipboardItem of clipboardItems) {
                  if (clipboardItem.types.includes('image/png') || 
                      clipboardItem.types.includes('image/jpeg') || 
                      clipboardItem.types.includes('image/gif')) {
                    clipboardItem.getType(clipboardItem.types[0]).then(blob => {
                      storeImage(blob);
                    });
                    break;
                  }
                }
              });
            }
          });
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
    const prevScale = scale;
    const newScale = Math.min(Math.max(prevScale * zoomFactor, 0.02), 16); // Clamp the scale

    // Calculate the world coordinates of the mouse position
    const worldX = xCenter / prevScale + offset.x;
    const worldY = yCenter / prevScale + offset.y;
    
    // Calculate the new offset to keep the mouse position fixed
    const newOffsetX = worldX - (xCenter / newScale);
    const newOffsetY = worldY - (yCenter / newScale);

    // Update both states together
    setScale(newScale);
    setOffset({ x: newOffsetX, y: newOffsetY });
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
    if (isTyping) return;
    
    // Always prevent default for wheel events with modifier keys
    if (e.ctrlKey || e.metaKey || e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      
      if (e.ctrlKey || e.metaKey) {
        const scaleDiff = e.deltaY > 0 ? 0.9 : 1.1;
        zoomInOut(scaleDiff, e.clientX, e.clientY);
      } else if (e.shiftKey) {
        // Check if we're on Windows
        const isWindows = navigator.platform.indexOf('Win') > -1;
        const xDiff = isWindows ? (e.deltaY > 0 ? 1 : -1) : (e.deltaX > 0 ? -1 : 1);
        setOffset((prevOffset) => ({
          x: prevOffset.x + xDiff / scale * 26,
          y: prevOffset.y
        }));
      }
    } else {
      const yDiff = e.deltaY > 0 ? 1 : -1;
      setOffset((prevOffset) => ({
        x: prevOffset.x,
        y: prevOffset.y + yDiff / scale * 26
      }));
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
        startX: startX,  // Store initial position
        startY: startY   // Store initial position
      });
  
    }
    else if (selectedTool == 'shape') {
      const startX = e.clientX;
      const startY = e.clientY;

      setDrawing(true);

      setCurrentShape({
        id: generateUniqueId(),
        x: xScreenToWorld(startX),
        y: yScreenToWorld(startY),
        w: 0,
        h: 0,
        selected: false,
        component: shapeToCreate,
        settings: defaultSettings[shapeToCreate]
      });

      mouseDownPosition.current = {x: xScreenToWorld(startX), y: yScreenToWorld(startY)}
    }
    else if (selectedTool == 'text') {
      const isCtrlPressed = e.ctrlKey || e.metaKey;
      if (isCtrlPressed) return;

      if (isTyping) {
        setIsTyping(false);
        if (currentTypingText.length == 0 || initialText.current.settings.text == currentTypingText) {
          setHiddenTextid(null);
          return;
        }
        const { width, height } = textInputRef.current.getBoundingClientRect();

        const newShape = {
          id: Date.now(),
          x: initialText.current.x,
          y: initialText.current.y,
          w: initialText.current.w ? inputTextScale.x * textInputRef.current.scrollWidth / scale : textInputRef.current.scrollWidth / scale,
          h: initialText.current.h ? inputTextScale.y * textInputRef.current.scrollHeight / scale  : textInputRef.current.scrollHeight / scale,
          component: "SimpleText",
          selected: false,
          settings: {
            text: currentTypingText,
            fontSizeRate: initialText.current.settings.fontSize / (width + height) * 2,
            textColor: initialText.current.settings.textColor,
            borderColor: initialText.current.settings.borderColor,
            textAnimation: defaultSettings['SimpleText'].textAnimation,
            animationSpeed: defaultSettings['SimpleText'].animationSpeed
          }
        };

      setAllShapes((prevShapes) => prevShapes.filter((shape) => shape.id !== hiddenTextId));
      pushToHistory()
      setAllShapes((prevShapes) => [...prevShapes, newShape]);
      pushToHistory()
      setHiddenTextid(null)
      return;
      }

      initialText.current = {
        x: xScreenToWorld(e.clientX),
        y: yScreenToWorld(e.clientY),
        settings: {
          fontSize: defaultSettings['SimpleText']['fontSize'],
          textColor: defaultSettings['SimpleText']['textColor'],
          borderColor: defaultSettings['SimpleText']['borderColor'],
        }
      }

      setInputTextScale({x:1,y:1});
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

      // Calculate min and max coordinates using stored initial positions
      const minX = Math.min(currentX, selectionDragBox.startX);
      const minY = Math.min(currentY, selectionDragBox.startY);
      const maxX = Math.max(currentX, selectionDragBox.startX);
      const maxY = Math.max(currentY, selectionDragBox.startY);

      setSelectionDragBox({
        ...selectionDragBox,
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
      });
    }
    else if (selectedTool == 'shape') {
      if (!drawing || !currentShape) return;
      var currentX = xScreenToWorld(e.clientX);
      var currentY = yScreenToWorld(e.clientY);
      
      const width = currentX - mouseDownPosition.current.x;
      const height = currentY - mouseDownPosition.current.y;
      console.log(height)
      const newShape = {
        ...currentShape,
        w: Math.abs(width),
        h: Math.abs(height),
        x: width > 0 ? mouseDownPosition.current.x : currentX,
        y: height > 0 ? mouseDownPosition.current.y : currentY,
        settings: {
          ...currentShape.settings,
          startX: width > 0 ? "0" : "100",
          startY: height > 0 ? "0" : "100",
          endX: width > 0 ? "100" : "0",
          endY: height > 0 ? "100" : "0"
        }
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
    
    const deltaX = (e.clientX - startX) / scale;
    const deltaY = (e.clientY - startY) / scale;
  
    if (corner === "bottomRight") {
      // If we're hitting the left border
      if (deltaX + initialWidth < 0) {
        // Fix the right edge position and let the left edge move
        const mouseX = xScreenToWorld(e.clientX);
        const hitPointX = initialX;
        newWidth = Math.max(hitPointX - mouseX, 1);
        newX = mouseX;
      } else {
        newWidth = Math.max(initialWidth + deltaX, 1);
        if (newWidth === 1 && deltaX < 0) {
          // When hitting minimum width, maintain the right edge position
          const mouseX = xScreenToWorld(e.clientX);
          const hitPointX = initialX;
          newWidth = Math.max(hitPointX - mouseX, 1);
          newX = mouseX;
        }
      }
      
      // If we're hitting the top border
      if (deltaY + initialHeight < 0) {
        // Fix the bottom edge position and let the top edge move
        const mouseY = yScreenToWorld(e.clientY);
        const hitPointY = initialY;
        newHeight = Math.max(hitPointY - mouseY, 1);
        newY = mouseY;
      } else {
        newHeight = Math.max(initialHeight + deltaY, 1);
        if (newHeight === 1 && deltaY < 0) {
          // When hitting minimum height, maintain the bottom edge position
          const mouseY = yScreenToWorld(e.clientY);
          const hitPointY = initialY;
          newHeight = Math.max(hitPointY - mouseY, 1);
          newY = mouseY;
        }
      }
    } else if (corner === "topRight") {
      // If we're hitting the left border
      if (deltaX + initialWidth < 0) {
        // Fix the right edge position and let the left edge move
        const mouseX = xScreenToWorld(e.clientX);
        const hitPointX = initialX;
        newWidth = Math.max(hitPointX - mouseX, 1);
        newX = mouseX;
      } else {
        newWidth = Math.max(initialWidth + deltaX, 1);
        if (newWidth === 1 && deltaX < 0) {
          // When hitting minimum width, maintain the right edge position
          const mouseX = xScreenToWorld(e.clientX);
          const hitPointX = initialX;
          newWidth = Math.max(hitPointX - mouseX, 1);
          newX = mouseX;
        }
      }
      
      // If we're hitting the bottom border
      if (-deltaY + initialHeight < 0) {
        // Fix the top edge position and let the bottom edge move
        const mouseY = yScreenToWorld(e.clientY);
        const hitPointY = initialY + initialHeight;
        newHeight = Math.max(mouseY - hitPointY, 1);
        newY = hitPointY;
      } else {
        newHeight = Math.max(initialHeight - deltaY, 1);
        if (newHeight === 1 && deltaY > 0) {
          // When hitting minimum height, maintain the top edge position
          const mouseY = yScreenToWorld(e.clientY);
          const hitPointY = initialY + initialHeight;
          newHeight = Math.max(mouseY - hitPointY, 1);
          newY = hitPointY;
        } else {
          newY = initialY + deltaY;
        }
      }
    } else if (corner === "topLeft") {
      // If we're hitting the right border
      if (-deltaX + initialWidth < 0) {
        // Fix the left edge position and let the right edge move
        const mouseX = xScreenToWorld(e.clientX);
        const hitPointX = initialX + initialWidth;
        newWidth = Math.max(mouseX - hitPointX, 1);
        newX = hitPointX;
      } else {
        newWidth = Math.max(initialWidth - deltaX, 1);
        if (newWidth === 1 && deltaX > 0) {
          // When hitting minimum width, maintain the left edge position
          const mouseX = xScreenToWorld(e.clientX);
          const hitPointX = initialX + initialWidth;
          newWidth = Math.max(mouseX - hitPointX, 1);
          newX = hitPointX;
        } else {
          newX = initialX + deltaX;
        }
      }
      
      // If we're hitting the bottom border
      if (-deltaY + initialHeight < 0) {
        // Fix the top edge position and let the bottom edge move
        const mouseY = yScreenToWorld(e.clientY);
        const hitPointY = initialY + initialHeight;
        newHeight = Math.max(mouseY - hitPointY, 1);
        newY = hitPointY;
      } else {
        newHeight = Math.max(initialHeight - deltaY, 1);
        if (newHeight === 1 && deltaY > 0) {
          // When hitting minimum height, maintain the top edge position
          const mouseY = yScreenToWorld(e.clientY);
          const hitPointY = initialY + initialHeight;
          newHeight = Math.max(mouseY - hitPointY, 1);
          newY = hitPointY;
        } else {
          newY = initialY + deltaY;
        }
      }
    } else if (corner === "bottomLeft") {
      // If we're hitting the right border
      if (-deltaX + initialWidth < 0) {
        // Fix the left edge position and let the right edge move
        const mouseX = xScreenToWorld(e.clientX);
        const hitPointX = initialX + initialWidth;
        newWidth = Math.max(mouseX - hitPointX, 1);
        newX = hitPointX;
      } else {
        newWidth = Math.max(initialWidth - deltaX, 1);
        if (newWidth === 1 && deltaX > 0) {
          // When hitting minimum width, maintain the left edge position
          const mouseX = xScreenToWorld(e.clientX);
          const hitPointX = initialX + initialWidth;
          newWidth = Math.max(mouseX - hitPointX, 1);
          newX = hitPointX;
        } else {
          newX = initialX + deltaX;
        }
      }
      
      // If we're hitting the top border
      if (deltaY + initialHeight < 0) {
        // Fix the bottom edge position and let the top edge move
        const mouseY = yScreenToWorld(e.clientY);
        const hitPointY = initialY;
        newHeight = Math.max(hitPointY - mouseY, 1);
        newY = mouseY;
      } else {
        newHeight = Math.max(initialHeight + deltaY, 1);
        if (newHeight === 1 && deltaY < 0) {
          // When hitting minimum height, maintain the bottom edge position
          const mouseY = yScreenToWorld(e.clientY);
          const hitPointY = initialY;
          newHeight = Math.max(hitPointY - mouseY, 1);
          newY = mouseY;
        }
      }
    } else if (corner === "topEdge") {
      // If we're hitting the bottom border
      if (-deltaY + initialHeight < 0) {
        // Fix the top edge position and let the bottom edge move
        const mouseY = yScreenToWorld(e.clientY);
        const hitPointY = initialY + initialHeight;
        newHeight = Math.max(mouseY - hitPointY, 1);
        newY = hitPointY;
      } else {
        newHeight = Math.max(initialHeight - deltaY, 1);
        if (newHeight === 1 && deltaY > 0) {
          // When hitting minimum height, maintain the top edge position
          const mouseY = yScreenToWorld(e.clientY);
          const hitPointY = initialY + initialHeight;
          newHeight = Math.max(mouseY - hitPointY, 1);
          newY = hitPointY;
        } else {
          newY = initialY + deltaY;
        }
      }
    } else if (corner === "bottomEdge") {
      // If we're hitting the top border
      if (deltaY + initialHeight < 0) {
        // Fix the bottom edge position and let the top edge move
        const mouseY = yScreenToWorld(e.clientY);
        const hitPointY = initialY;
        newHeight = Math.max(hitPointY - mouseY, 1);
        newY = mouseY;
      } else {
        newHeight = Math.max(initialHeight + deltaY, 1);
        if (newHeight === 1 && deltaY < 0) {
          // When hitting minimum height, maintain the bottom edge position
          const mouseY = yScreenToWorld(e.clientY);
          const hitPointY = initialY;
          newHeight = Math.max(hitPointY - mouseY, 1);
          newY = mouseY;
        }
      }
    } else if (corner === "leftEdge") {
      // If we're hitting the right border
      if (-deltaX + initialWidth < 0) {
        // Fix the left edge position and let the right edge move
        const mouseX = xScreenToWorld(e.clientX);
        const hitPointX = initialX + initialWidth;
        newWidth = Math.max(mouseX - hitPointX, 1);
        newX = hitPointX;
      } else {
        newWidth = Math.max(initialWidth - deltaX, 1);
        if (newWidth === 1 && deltaX > 0) {
          // When hitting minimum width, maintain the left edge position
          const mouseX = xScreenToWorld(e.clientX);
          const hitPointX = initialX + initialWidth;
          newWidth = Math.max(mouseX - hitPointX, 1);
          newX = hitPointX;
        } else {
          newX = initialX + deltaX;
        }
      }
    } else if (corner === "rightEdge") {
      // If we're hitting the left border
      if (deltaX + initialWidth < 0) {
        // Fix the right edge position and let the left edge move
        const mouseX = xScreenToWorld(e.clientX);
        const hitPointX = initialX;
        newWidth = Math.max(hitPointX - mouseX, 1);
        newX = mouseX;
      } else {
        newWidth = Math.max(initialWidth + deltaX, 1);
        if (newWidth === 1 && deltaX < 0) {
          // When hitting minimum width, maintain the right edge position
          const mouseX = xScreenToWorld(e.clientX);
          const hitPointX = initialX;
          newWidth = Math.max(hitPointX - mouseX, 1);
          newX = mouseX;
        }
      }
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
    const resizedItems = initialAllShapes.map((shape) => {
      if (!shape.selected) return shape;
      
      const shapeNewX = Math.round((shape.x - initialX) * widthRatio + newX);
      const shapeNewY = Math.round((shape.y - initialY) * heightRatio + newY);
      const shapeNewWidth = Math.round(shape.w * widthRatio);
      const shapeNewHeight = Math.round(shape.h * heightRatio);
      
      // Calculate start/end points based on border crossing logic
      let startX = shape.settings.startX;
      let startY = shape.settings.startY;
      let endX = shape.settings.endX;
      let endY = shape.settings.endY;
      
      if (corner === "bottomRight") {
        // If width becomes negative
        if (deltaX + initialWidth < 0) {
          startX = shape.settings.endX;
          endX = shape.settings.startX;
        }
        
        // If height becomes negative
        if (deltaY + initialHeight < 0) {
          startY = shape.settings.endY;
          endY = shape.settings.startY;
        }
      } else if (corner === "bottomLeft") {
        // If width becomes negative
        if (-deltaX + initialWidth < 0) {
          startX = shape.settings.endX;
          endX = shape.settings.startX;
        }
        
        // If height becomes negative
        if (deltaY + initialHeight < 0) {
          startY = shape.settings.endY;
          endY = shape.settings.startY;
        }
      } else if (corner === "topRight") {
        // If width becomes negative
        if (deltaX + initialWidth < 0) {
          startX = shape.settings.endX;
          endX = shape.settings.startX;
        }
        
        // If height becomes negative
        if (-deltaY + initialHeight < 0) {
          startY = shape.settings.endY;
          endY = shape.settings.startY;
        }
      } else if (corner === "topLeft") {
        // If width becomes negative
        if (-deltaX + initialWidth < 0) {
          startX = shape.settings.endX;
          endX = shape.settings.startX;
        }
        
        // If height becomes negative
        if (-deltaY + initialHeight < 0) {
          startY = shape.settings.endY;
          endY = shape.settings.startY;
        }
      }
      
      return {
        ...shape,
        x: shapeNewX,
        y: shapeNewY,
        w: shapeNewWidth,
        h: shapeNewHeight,
        settings: {
          ...shape.settings,
          startX,
          startY,
          endX,
          endY
        }
      };
    });

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

      initialText.current = {
        ...shape,
        settings: {
          ...shape.settings,
          fontSize: shape.settings.fontSizeRate * (shape.w + shape.h) / 2 * scale,
          textColor: shape.settings.textColor,
        },
      }

      setHiddenTextid(id);

      setCurrentTypingText(shape.settings.text);
      setIsTyping(true);

      setInputTextScale({
        x: (shape.w * scale) / (textInputRef.current?.scrollWidth ) || 1,
        y: (shape.h * scale) / (textInputRef.current?.scrollHeight ) || 1
      });
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
    // Only handle paste events when not in typing mode
    if (isTyping) return;
    
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
        try {
          const imageUrl = await loadImageAsBase64(pasteImageId);
          
          if (!imageUrl) {
            setPasteImageId(null);
            return;
          }

          // Create a new image and wait for it to load
          const img = document.createElement('img');
          img.crossOrigin = "anonymous"; // Add this to handle CORS if needed
          
          await new Promise((resolve, reject) => {
            img.onload = () => resolve(img);
            img.src = imageUrl;
          });
          
          const imageShape = {
            id: generateUniqueId(),
            x: xScreenToWorld(universalMousePosition.current.x) - img.width / 2,
            y: yScreenToWorld(universalMousePosition.current.y) - img.height / 2,
            w: img.width,
            h: img.height,
            selected: false,
            component: 'SimpleImage',
            settings: { imageId: pasteImageId },
          };
  
          setAllShapes((prev) => [...prev, imageShape]);
          pushToHistory();
          setPasteImageId(null);
        } catch (err) {
          console.error("Error in pasteImageFunction:", err);
          setPasteImageId(null);
        }
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
        setInputTextScale({
          x: (initialText.current.w * scale) / (textInputRef.current.scrollWidth ),
          y: (initialText.current.h * scale) / (textInputRef.current.scrollHeight )
        });
    }
  }, [isTyping]);

  useEffect(() => {
    // Add global event listener to prevent Chrome's default zoom behavior
    const preventDefaultZoom = (e) => {
      if ((e.ctrlKey || e.shiftKey) && e.type === 'wheel') {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Add event listener with passive: false to ensure preventDefault works
    document.addEventListener('wheel', preventDefaultZoom, { passive: false });
    document.addEventListener('mousewheel', preventDefaultZoom, { passive: false });

    return () => {
      document.removeEventListener('wheel', preventDefaultZoom);
      document.removeEventListener('mousewheel', preventDefaultZoom);
    };
  }, []);

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
      {!isFreezeScreenSelected && !isTyping &&
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

      {selectedTool === 'shape' && !isTyping &&
        <ShapeToolbar setShapeToCreate={setShapeToCreate} shapeToCreate={shapeToCreate}/>
      }

      {selectedShape && selectedTool === 'select' && !isFreezeScreenSelected &&
        <ShapeSettings selectedShape={selectedShape} changeShapeSettingByName={changeShapeSettingByName} updateColorPalette={updateColorPalette} colorPalette={colorPalette} />
      }

      <LogoBar 
        setAllShapes={setAllShapes} 
        pushToHistory={pushToHistory} 
        allShapes={allShapes}
        scale={scale}
        offset={offset}
        boardColor={boardColor}
        setScale={setScale}
        setOffset={setOffset}
        setBoardColor={setBoardColor}
      />

      { !isTyping &&
        <ZoomToolbar scale={scale} zoomInOut={zoomInOut} resetZoom={resetZoom} fitScreen={fitScreen} freezeScreen={freezeScreen} isFreezeScreenSelected={isFreezeScreenSelected}/>
      }

      { !isFreezeScreenSelected &&  !isTyping &&
        <BottomToolbar boardColor={boardColor} setBoardColor={setBoardColor} />
      }
      
      {allShapes
      .filter(shape => shape.id != hiddenTextId)
      .map((shape, index) => (
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
          <ShapeWrapper
            selectedTool={selectedTool}
            ShapeComponent={currentShape.component}
            initialSize={{w:currentShape.w, h:currentShape.h}}
            scale={scale} offset={offset}
            finalPosition={{x:currentShape.x, y:currentShape.y}}
            shapeSettings={currentShape.settings}
          />
       )}

      {isTyping && initialText && ( 
      <div

        style={{
          position: "absolute",
          left: `${xWorldToScreen(initialText.current.x)}px`,
          top: `${yWorldToScreen(initialText.current.y)}px`,
          minWidth: "10px",
          minHeight: "30px",
          color: "white",
          outline: "none",
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          width: initialText?.current.w * scale || 1,
          height: initialText?.current.h * scale || 1,
        }}
      >
      <div
      contentEditable
      suppressContentEditableWarning
      className="editable-div"
      onInput={(e) => {
        setCurrentTypingText(e.target.innerText);
      }}
      onKeyDown={(e) => {
        // Allow copy and paste shortcuts
        if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v')) {
          return;
        }
        e.stopPropagation();
      }}
      onPaste={(e) => {
        e.preventDefault();
        e.stopPropagation();
        // Only paste text content
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
      }}
      onMouseDown={(e) => e.stopPropagation()}
      ref={textInputRef}
        style={{
          fontSize: `${initialText.current.settings.fontSize}px`,
          color: initialText.current.settings.textColor,
          whiteSpace: "pre",
          transformOrigin: "0 0",
          backgroundColor: "rgba(10, 119, 236, 0.48)",
          outline: "1px solid rgba(2, 25, 50, 0.32)",
          transform: `scale(${inputTextScale.x}, ${inputTextScale.y})`
        }}
      >
        {initialText.current.settings.text}
        </div>
      </div>
      )}

       {/* Selection Box */}
      {selectionDragBox && !isTyping && (
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

        {selectionBox && !isTyping && (
        <div
          onMouseDown={handleMouseDownSelectionBox}
          style={{
            position: "absolute",
            top: `${(selectionBox.y - offset.y - 1) * scale}px`,
            left: `${(selectionBox.x - offset.x - 1) * scale}px`,
            width: `${(selectionBox.width + 2) * scale}px`,
            height: `${(selectionBox.height + 2) * scale}px`,
            backgroundColor: selectedShape && ['Arrow', 'ArrowBar', 'ArrowCurve', 'ArrowCurveReverse', 'ArrowProgress'].includes(selectedShape.component) 
              ? "transparent" 
              : "rgba(0, 118, 215, 0.05)",
            border: selectedShape && ['Arrow', 'ArrowBar', 'ArrowCurve', 'ArrowCurveReverse', 'ArrowProgress'].includes(selectedShape.component)
              ? "none"
              : "2px dotted rgb(0, 68, 140)",
            cursor: "grab"
          }}
        >
          {/* Show corners based on arrow direction */}
          {selectedShape && ['Arrow', 'ArrowBar', 'ArrowCurve', 'ArrowCurveReverse', 'ArrowProgress'].includes(selectedShape.component) ? (
            <>
              {/* Show all four corners for arrows */}
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
            </>
          ) : (
            <>
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
              />
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
            </>
          )}
        </div>
      )}
    </div>
  );
}
