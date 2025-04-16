import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import ColorPickerComponent from "./ColorPickerComponent";

const ShapeSettings = ({selectedShape, changeShapeSettingByName, updateColorPalette, colorPalette}) => {

  const [animationSpeed, setAnimationSpeed] = useState(selectedShape.settings?.animationSpeed)
  const [arrowHeads, setArrowHeads] = useState(selectedShape.settings?.head)
  const [shapeText, setShapeText] = useState(selectedShape.settings?.shapeText)
  const [thickness, setThickness] = useState(selectedShape.settings?.thickness)
  const [textAnimation, setTextAnimation] = useState(selectedShape.settings?.textAnimation)

  useEffect(()=> {
    changeShapeSettingByName("animationSpeed", animationSpeed);
  }, [animationSpeed])

  useEffect(()=> {
    changeShapeSettingByName("head", arrowHeads);
  }, [arrowHeads])

  useEffect(()=> {
    changeShapeSettingByName("shapeText", shapeText);
  }, [shapeText])

  useEffect(()=> {
    changeShapeSettingByName("thickness", thickness);
  }, [thickness])

  useEffect(()=> {
    changeShapeSettingByName("textAnimation", textAnimation);
  }, [textAnimation])

  const handleMouseDown = (event) => {
    event.stopPropagation();
  };

  const handleMouseUp = (event) => {
    event.stopPropagation();
  };

  if (!selectedShape.settings.animationSpeedOff) {
    selectedShape.settings.animationSpeedOff = 'yes'
  }
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
            
          {selectedShape.settings.animationSpeedOff == 'yes' && (
            <button onClick={()=> {setAnimationSpeed('no-animation')}} className={animationSpeed === 'no-animation' ? "isSelected" : ""} >Off</button>
          )} 
            <button onClick={()=> {setAnimationSpeed('slow')}} className={animationSpeed === 'slow' ? "isSelected" : ""} >Slow</button>
            <button onClick={()=> {setAnimationSpeed('normal')}} className={animationSpeed === 'normal' ? "isSelected" : ""} >Normal</button>
            <button onClick={()=> {setAnimationSpeed('fast')}} className={animationSpeed === 'fast' ? "isSelected" : ""} >Fast</button>
          </div>
        </div>
      )}

      {selectedShape.settings.head && (
        <div className="toolbar-item">
          <div className="toolbar-title">Heads</div>
          <div className="toolbar-setting">
            
          {selectedShape.settings.animationSpeedOff == 'yes' && (
            <button onClick={()=> {setArrowHeads('no-head')}} className={arrowHeads === 'no-head' ? "isSelected" : ""} >Off</button>
          )} 
            <button onClick={()=> {setArrowHeads('start')}} className={arrowHeads === 'start' ? "isSelected" : ""} >Start</button>
            <button onClick={()=> {setArrowHeads('end')}} className={arrowHeads === 'end' ? "isSelected" : ""} >End</button>
            <button onClick={()=> {setArrowHeads('both')}} className={arrowHeads === 'both' ? "isSelected" : ""} >Both</button>
          </div>
        </div>
      )}

      {selectedShape.settings.thickness && (
        <div className="toolbar-item">
          <div className="toolbar-title">Thickness</div>
          <div className="toolbar-setting">
            
          <button onClick={()=> {setThickness('narrow')}} className={thickness === 'narrow' ? "isSelected" : ""} >Narrow</button>
          <button onClick={()=> {setThickness('normal')}} className={thickness === 'normal' ? "isSelected" : ""} >Normal</button>
          <button onClick={()=> {setThickness('bold')}} className={thickness === 'bold' ? "isSelected" : ""} >Bold</button>
          </div>
        </div>
      )}

      {selectedShape.settings.textAnimation !== undefined && (
        <div className="toolbar-item">
          <div className="toolbar-title">Text Animation</div>
          <div className="toolbar-setting">
            <button onClick={()=> {setTextAnimation('none')}} className={textAnimation === 'none' ? "isSelected" : ""} >None</button>
            <button onClick={()=> {setTextAnimation('color-fade')}} className={textAnimation === 'color-fade' ? "isSelected" : ""} >Color Fade</button>
            <button onClick={()=> {setTextAnimation('shake')}} className={textAnimation === 'shake' ? "isSelected" : ""} >Shake</button>
            <button onClick={()=> {setTextAnimation('pulse')}} className={textAnimation === 'pulse' ? "isSelected" : ""} >Pulse</button>
          </div>
        </div>
      )}

      {selectedShape.settings.shapeText && (
        <div className="toolbar-item">
          <div className="toolbar-title">Text</div>
          <div className="toolbar-setting">
            <input
              type="text"
              value={shapeText}
              onChange={(e) => {setShapeText(e.target.value)}}
              onKeyDown={(e) => {e.stopPropagation()}}
              style={{
                backgroundColor: "#555",
                color: "white",
                padding: "2px",
                paddingRight: "4px",
                paddingLeft: "4px",
                borderRadius: "4px"
              }}
            />
          </div>
        </div>
    )}
  </div>
  )
}



export default ShapeSettings;