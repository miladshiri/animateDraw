"use client";

import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

const BottomToolbar = ({boardColor, setBoardColor}) => {
  const toolbarStyle = {
    position: "fixed",
    bottom: "14px",
    right: "250px",
    transform: "translateX(-10%)",
    width: "40px",
    height: "40px",
    backgroundColor: "rgba(48, 48, 48, 0.95)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    padding: "3px",
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const [showPicker, setShowPicker] = useState(false);


  return (
    <div className="toolbar" style={toolbarStyle}
      onMouseUp={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
    >

      <button
        onMouseUp={(event) => event.stopPropagation()}
        onMouseDown={(event) => setShowPicker(!showPicker)}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: `${boardColor}`
        }}
      >
      </button>

      {/* Color Picker (Shown on Click) */}
      {showPicker && (
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "0",
            background: "#fff",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            zIndex: 10,
          }}
        >
          <HexColorPicker onMouseUp={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} color={boardColor} onChange={setBoardColor} />
          <div>{boardColor}</div>
          <button
            onMouseUp={(e) => {setShowPicker(false); e.stopPropagation();}}
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "5px",
              background: "#000",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}

    </div>
  );
};

export default BottomToolbar;
