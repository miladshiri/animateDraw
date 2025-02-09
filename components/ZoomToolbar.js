"use client";

import React, { useState } from "react";
import { ZoomIn, ZoomOut, ScanSearch, Expand, Lock } from "lucide-react";

const ZoomToolbar = ({ scale, zoomInOut, resetZoom, fitScreen, freezeScreen, isFreezeScreenSelected }) => {
  const toolbarStyle = {
    position: "fixed",
    bottom: "10px", // margin from the top
    right: "1px",
    transform: "translateX(-10%)",
    width: "220px", // 1/4 of the screen width
    backgroundColor: "rgba(48, 48, 48, 0.95)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Shadow effect
    borderRadius: "8px", // Slightly rounded corners
    padding: "6px",
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
    <div className="toolbar" style={toolbarStyle}
      onMouseUp={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
    >

      <button
        onMouseUp={(event) => event.stopPropagation()}
        onMouseDown={(event) => zoomIn(event)}
      >
        <ZoomIn size={18} strokeWidth={1} />
      </button>

      <button
        onMouseUp={(event) => event.stopPropagation()}
        onMouseDown={(event) => resetZoom()}
      >
        <div
          style={{
            color:"#ededed",
          }}
        >{Math.round(scale*100)}%</div>
      </button>

      <button
        onMouseUp={(event) => event.stopPropagation()}
        onMouseDown={(event) => zoomOut(event)}
      >
        <ZoomOut size={18} strokeWidth={1} />
      </button>

      <div className="toolbar-separator"></div>

      <button
        onMouseUp={(event) => event.stopPropagation()}
        onMouseDown={(event) => fitScreen(event)}
      >
        <ScanSearch size={18} strokeWidth={1} />
      </button>

      <button
        onMouseUp={(event) => event.stopPropagation()}
        onMouseDown={(event) => freezeScreen(event)}
        className={isFreezeScreenSelected ? 'isSelected' : ''}
        style={{
          width: "32px",
          height: "32px",
          position: "relative",
        }}
      >
        <Expand size={18} strokeWidth={1} 
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: '0',
          left: '0',
          padding: '6px',
        }} />
        {isFreezeScreenSelected &&
          <Lock size={18} strokeWidth={3} 
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            padding: '10px',
          }} />
        }
      </button>

    </div>
  );
};

export default ZoomToolbar;
