"use client";

import React, { useState } from "react";
import { Undo, Redo, Move, SquareDashedMousePointer, Shapes } from "lucide-react";

const Toolbar = ({ setSelectedTool, selectedTool, undo, redo, history, redoStack }) => {
  const toolbarStyle = {
    position: "fixed",
    top: "10px", // margin from the top
    left: "50%",
    transform: "translateX(-50%)",
    width: "25%", // 1/4 of the screen width
    backgroundColor: "rgba(48, 48, 48, 0.95)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Shadow effect
    borderRadius: "8px", // Slightly rounded corners
    padding: "10px",
    zIndex: 1000, // Ensures it stays on top of other elements
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const shapeStyle = (shapeType, isSelected) => ({
    width: shapeType === "circle" ? "40px" : "50px",
    height: "40px",
    backgroundColor: isSelected ? "#4CAF50" : "#111D80",
    borderRadius: shapeType === "circle" ? "50%" : "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    userSelect: "none",
  });

  const handleMouseDown = (e, tool) => {
    e.stopPropagation();
    setSelectedTool(tool);
  }

  return (
    <div className="toolbar" style={toolbarStyle}>
      <button onMouseDown={(event) => handleMouseDown(event, "pan")} className={selectedTool === "pan" ? "isSelected" : ""} >
        <Move size={20} strokeWidth={1} />
      </button>
      <button onMouseDown={(event) => handleMouseDown(event, "select")} className={selectedTool === "select" ? "isSelected" : ""}>
        <SquareDashedMousePointer size={20} strokeWidth={1} />
      </button>
      <button onMouseDown={(event) => handleMouseDown(event, "shape")} className={selectedTool === "shape" ? "isSelected" : ""}>
        <Shapes size={20} strokeWidth={1} />
      </button>

      <div className="toolbar-separator"></div>

      <button
        onMouseUp={(event) => event.stopPropagation()}
        onMouseDown={(event) => undo(event)}
        disabled={history.length === 0}
      >
        <Undo size={20} strokeWidth={1} />
      </button>

      <button
        onMouseUp={(event) => event.stopPropagation()}
        onMouseDown={(event) => redo(event)}
        disabled={redoStack.length === 0}
      >
        <Redo size={20} strokeWidth={1} />
      </button>
    </div>
  );
};

export default Toolbar;
