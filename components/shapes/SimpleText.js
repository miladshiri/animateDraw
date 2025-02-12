import { useEffect, useState } from "react";

const SimpleText = ({size, shapeSettings}) => {

  const [fontSize, setFontSize] = useState(0);

  useEffect(() => {
    setFontSize(shapeSettings.fontSizeRate * (size.w + size.h) / 2);
  }, [size, shapeSettings])

  return (
    <div
      style={{
        color: shapeSettings.textColor, 
        backgroundColor: "red",
        width: size.w, 
        height: size.h,
        overflow: "hidden",
        fontSize: fontSize ? fontSize : 0,
        // transform: `scale(${finalSize.w / shapeSettings.initialW}, ${finalSize.h / shapeSettings.initialH})`,

      }}
    >
      {shapeSettings.text}
    </div>
  )
}

export default SimpleText;