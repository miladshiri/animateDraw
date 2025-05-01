import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

const ColorPickerComponent = ({initialColor, changeShapeSettingByName, settingName, updateColorPalette, colorPalette}) => {
  const [color, setColor] = useState(initialColor); // Default color
  const [showPicker, setShowPicker] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [inputValue, setInputValue] = useState(initialColor);

  const handleColorBoxClick = (e) => {
    e.stopPropagation();
    setShowPicker(!showPicker);
  }

  const handleInputChange = (e) => {
    e.stopPropagation();
    const newColor = e.target.value;
    setInputValue(newColor);
    // Only update if it's a valid hex color
    if (/^#[0-9A-Fa-f]{6}$/.test(newColor)) {
      setColor(newColor);
    }
  }

  const handleInputKeyDown = (e) => {
    e.stopPropagation();
    // Handle Ctrl+C or Cmd+C
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
      try {
        navigator.clipboard.writeText(color);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy color:', err);
      }
    }
  }

  const handleInputKeyUp = (e) => {
    e.stopPropagation();
  }

  const handleInputPaste = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const pastedText = e.clipboardData.getData('text');
    if (/^#[0-9A-Fa-f]{6}$/.test(pastedText)) {
      setColor(pastedText);
      setInputValue(pastedText);
    }
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
          <div style={{ marginTop: '10px', position: 'relative' }}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              onKeyUp={handleInputKeyUp}
              onPaste={handleInputPaste}
              style={{
                width: '100%',
                padding: '5px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                textAlign: 'center',
                color: 'black'
              }}
            />
            {showCopied && (
              <div style={{
                position: "absolute",
                top: "-25px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#333",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "4px",
                fontSize: "12px"
              }}>
                Copied!
              </div>
            )}
          </div>
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