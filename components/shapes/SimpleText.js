import { useEffect, useState, useRef } from "react";

const SimpleText = ({size, shapeSettings}) => {

  const [fontSize, setFontSize] = useState(0);
  const textInputRef = useRef(null);


  useEffect(() => {
    setFontSize(shapeSettings.fontSizeRate * (size.w + size.h) / 2);
  }, [size, shapeSettings])
  

  return (
    <div
      style={{
        color: shapeSettings.textColor, 
        width: size.w,
        height: size.h,
        // fontSize: fontSize ? fontSize : 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // transform: `scale(${finalSize.w / shapeSettings.initialW}, ${finalSize.h / shapeSettings.initialH})`,

      }}
    >
      <div      
      ref={textInputRef}
        style={{
          fontSize: "16px",
          whiteSpace: "pre",
          transform: `scale(${size.w / (textInputRef.current?.scrollWidth ) || 1}, ${size.h / (textInputRef.current?.scrollHeight ) || 1  })`
        }}
      >
      {shapeSettings.text}
      </div>
    </div>
    )
}

export default SimpleText;