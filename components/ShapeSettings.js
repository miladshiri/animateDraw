import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import ColorPickerComponent from "./ColorPickerComponent";

const ShapeSettings = ({selectedShape, changeShapeSettingByName}) => {

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
          <div className="toolbar-setting">
            <ColorPickerComponent initialColor={selectedShape.settings.borderColor} changeShapeSettingByName={changeShapeSettingByName} settingName={"borderColor"}/>
          </div>
        </div>
      )}

      {selectedShape.settings.backgroundColor && (
        <div>
        <div className="toolbar-title">Background Color</div>
        <div className="toolbar-setting">
          <ColorPickerComponent initialColor={selectedShape.settings.backgroundColor}  changeShapeSettingByName={changeShapeSettingByName} settingName={"backgroundColor"} />
        </div>
      </div>
      )}

      {selectedShape.settings.animationSpeed && (
        <div className="toolbar-title">Animation Speed</div>
      )}

    </div>
  )
}



export default ShapeSettings;