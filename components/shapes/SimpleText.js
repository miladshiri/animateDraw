import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const SimpleText = ({size, shapeSettings}) => {

  const [fontSize, setFontSize] = useState(0);
  const textInputRef = useRef(null);

  useEffect(() => {
    setFontSize(shapeSettings.fontSizeRate * (size.w + size.h) / 2);
  }, [size, shapeSettings])

  let speed = 1;
  if (shapeSettings.animationSpeed === 'slow') {
    speed = 2;
  } else if (shapeSettings.animationSpeed === 'normal') {
    speed = 1;
  } else if (shapeSettings.animationSpeed === 'fast') {
    speed = 0.5;
  }

  const getAnimationStyle = () => {
    if (!shapeSettings.textAnimation) return {};



    switch(shapeSettings.textAnimation) {
      case 'color-fade':
        return {
          animate: { 
            opacity: [1, 0.2, 1]
          },
          transition: { 
            duration: 2 * speed,
            repeat: Infinity,
            ease: "easeInOut"
          }
        };
      case 'shake':
        return {
          animate: { 
            x: [0, -5, 5, -5, 5, 0]
          },
          transition: { 
            duration: 0.5 * speed,
            repeat: Infinity,
            ease: "easeInOut"
          }
        };
      case 'pulse':
        return {
          animate: { 
            scale: [1, 1.1, 1]
          },
          transition: { 
            duration: 1 * speed,
            repeat: Infinity,
            ease: "easeInOut"
          }
        };
      default:
        return {};
    }
  };

  const scaledText = (
    <div
      ref={textInputRef}
      style={{
        fontSize: "16px",
        whiteSpace: "pre",
        transform: `scale(${size.w / (textInputRef.current?.scrollWidth ) || 1}, ${size.h / (textInputRef.current?.scrollHeight ) || 1  })`,
        overflow: "hidden",
        color: shapeSettings.textColor
      }}
    >
      {shapeSettings.text}
    </div>
  );

  return (
    <div
      style={{
        width: size.w,
        height: size.h,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {shapeSettings.textAnimation === 'shake' ? (
        <motion.div
        key={speed}
          style={{
            position: "relative"
          }}
          {...getAnimationStyle()}
        >
          {scaledText}
        </motion.div>
      ) : (
        <motion.div
        key={speed}
          {...getAnimationStyle()}
        >
          {scaledText}
        </motion.div>
      )}
    </div>
  )
}

export default SimpleText;