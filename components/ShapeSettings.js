import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import ColorPickerComponent from "./ColorPickerComponent";

const ShapeSettings = ({selectedShape, changeShapeSettingByName, updateColorPalette, colorPalette}) => {

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
            <ColorPickerComponent initialColor={selectedShape.settings.shapeColor}  changeShapeSettingByName={changeShapeSettingByName} settingName={"shapeColor"} updateColorPalette={updateColorPalette} colorPalette={colorPalette} />
          </div>
        </div>
      )}

      {selectedShape.settings.borderColor && (
        <div className="toolbar-item">
          <div className="toolbar-title">Border Color</div>
          <div className="toolbar-setting">
            <ColorPickerComponent initialColor={selectedShape.settings.borderColor} changeShapeSettingByName={changeShapeSettingByName} settingName={"borderColor"} updateColorPalette={updateColorPalette} colorPalette={colorPalette}/>
          </div>
        </div>
      )}

      {selectedShape.settings.flowColor && (
        <div className="toolbar-item">
          <div className="toolbar-title">Flow Color</div>
          <div className="toolbar-setting">
            <ColorPickerComponent initialColor={selectedShape.settings.flowColor} changeShapeSettingByName={changeShapeSettingByName} settingName={"flowColor"} updateColorPalette={updateColorPalette} colorPalette={colorPalette}/>
          </div>
        </div>
      )}
    
      {selectedShape.settings.textColor && (
        <div className="toolbar-item">
          <div className="toolbar-title">Text Color</div>
          <div className="toolbar-setting">
            <ColorPickerComponent initialColor={selectedShape.settings.textColor} changeShapeSettingByName={changeShapeSettingByName} settingName={"textColor"} updateColorPalette={updateColorPalette} colorPalette={colorPalette}/>
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