import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

const ColorPickerComponent = ({initialColor, changeShapeSettingByName, settingName}) => {
  const [color, setColor] = useState(initialColor); // Default color
  const [showPicker, setShowPicker] = useState(false);

  const handleColorBoxClick = (e) => {
    e.stopPropagation();
    setShowPicker(!showPicker);
  }

  useEffect(() => {
    changeShapeSettingByName(settingName, color);
  }, [color])

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Color Display Box */}
      <div
        onMouseDown={handleColorBoxClick}
        onMouseUp={(e) => e.stopPropagation()}
        style={{
          width: "180px",
          height: "30px",
          backgroundColor: color,
          border: "2px solid #000",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
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