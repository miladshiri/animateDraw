import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import ColorPickerComponent from "./ColorPickerComponent";

const ShapeSettings = ({selectedShape, changeShapeSettingByName}) => {

  const [animationSpeed, setAnimationSpeed] = useState(selectedShape.settings?.animationSpeed)

  useEffect(()=> {
    changeShapeSettingByName("animationSpeed", animationSpeed);
  }, [animationSpeed])

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

      {selectedShape.settings.shapeColor && (
        <div className="toolbar-item">
          <div className="toolbar-title">Shape Color</div>
          <div className="toolbar-setting">
            <ColorPickerComponent initialColor={selectedShape.settings.shapeColor}  changeShapeSettingByName={changeShapeSettingByName} settingName={"shapeColor"} />
          </div>
        </div>
      )}

      {selectedShape.settings.borderColor && (
        <div className="toolbar-item">
          <div className="toolbar-title">Border Color</div>
          <div className="toolbar-setting">
            <ColorPickerComponent initialColor={selectedShape.settings.borderColor} changeShapeSettingByName={changeShapeSettingByName} settingName={"borderColor"}/>
          </div>
        </div>
      )}

      {selectedShape.settings.animationSpeed && (
        <div className="toolbar-item">
          <div className="toolbar-title">Animation Speed</div>
          <div className="toolbar-setting">
            <button onClick={()=> {setAnimationSpeed('no-animation')}} className={animationSpeed === 'no-animation' ? "isSelected" : ""} >Off</button>
            <button onClick={()=> {setAnimationSpeed('slow')}} className={animationSpeed === 'slow' ? "isSelected" : ""} >Slow</button>
            <button onClick={()=> {setAnimationSpeed('normal')}} className={animationSpeed === 'normal' ? "isSelected" : ""} >Normal</button>
            <button onClick={()=> {setAnimationSpeed('fast')}} className={animationSpeed === 'fast' ? "isSelected" : ""} >Fast</button>
          </div>
        </div>
      )}

    </div>
  )
}



export default ShapeSettings;