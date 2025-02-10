import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

const ColorPickerComponent = ({initialColor, changeShapeSettingByName, settingName, updateColorPalette, colorPalette}) => {
  const [color, setColor] = useState(initialColor); // Default color
  const [showPicker, setShowPicker] = useState(false);

  const handleColorBoxClick = (e) => {
    e.stopPropagation();
    setShowPicker(!showPicker);
  }

  useEffect(() => {
    changeShapeSettingByName(settingName, color);
    updateColorPalette();
  }, [color])

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Color Display Box */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around"
        }}
      >
      <div
        onMouseDown={handleColorBoxClick}
        onMouseUp={(e) => e.stopPropagation()}
        style={{
          width: "30px",
          height: "30px",
          backgroundColor: color,
          border: "1px solid #fff",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
      </div>
      
      <div className="toolbar-separator"></div>
      
      {colorPalette.map((colorItem, index) => (
        <div
          key={index}
          onMouseDown={() => setColor(colorItem)}
          onMouseUp={(e) => e.stopPropagation()}
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: `${colorItem}`,
            border: "1px solid #fff",
            cursor: "pointer",
            borderRadius: "4px",
            margin: "2px",
          }}
        >
        </div>
      ))}
      </div>
      {/* Color Picker (Shown on Click) */}
      {showPicker && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "0",
            background: "#fff",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            zIndex: 10,
          }}
        >
          <HexColorPicker onMouseUp={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} color={color} onChange={setColor} />
          <div>{color}</div>
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

export default ColorPickerComponent;