"use client";

import React, { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";

const ZoomToolbar = ({ scale, zoomInOut }) => {
  const toolbarStyle = {
    position: "fixed",
    bottom: "10px", // margin from the top
    right: "1px",
    transform: "translateX(-10%)",
    width: "150px", // 1/4 of the screen width
    backgroundColor: "rgba(48, 48, 48, 0.95)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Shadow effect
    borderRadius: "8px", // Slightly rounded corners
    padding: "10px",
    zIndex: 1000, // Ensures it stays on top of other elements
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const zoomIn = (e) => {
    e.stopPropagation();
    zoomInOut (0.8, window.innerWidth / 2, window.innerHeight / 2);
  }

  const zoomOut = (e) => {
    e.stopPropagation();
    zoomInOut (1.2, window.innerWidth / 2, window.innerHeight / 2);
  }

  return (
    <div className="toolbar" style={toolbarStyle}>

      <button
        onMouseUp={(event) => event.stopPropagation()}
        onMouseDown={(event) => zoomIn(event)}
      >
        <ZoomIn size={20} strokeWidth={1} />
      </button>

      <div
        style={{
          color:"#ededed",
        }}
      >{Math.round(scale*100)}%</div>

      <button
        onMouseUp={(event) => event.stopPropagation()}
        onMouseDown={(event) => zoomOut(event)}
      >
        <ZoomOut size={20} strokeWidth={1} />
      </button>
    </div>
  );
};

export default ZoomToolbar;
