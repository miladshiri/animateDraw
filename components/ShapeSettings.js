import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import ColorPickerComponent from "./ColorPickerComponent";

const ShapeSettings = ({selectedShape}) => {

  const handleMouseDown = (event) => {
    event.stopPropagation();
  };

  const handleMouseUp = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className="toolbar shape-toolbar settings-toolbar"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {selectedShape.settings.borderColor && (
        <div>
          <div className="toolbar-title">Border Color</div>
          <ColorPickerComponent initialColor={selectedShape.settings.borderColor} />
        </div>
      )}

      {selectedShape.settings.backgroundColor && (
        <div className="toolbar-title">Background Color</div>
      )}

      {selectedShape.settings.animationSpeed && (
        <div className="toolbar-title">Animation Speed</div>
      )}

    </div>
  )
}



export default ShapeSettings;