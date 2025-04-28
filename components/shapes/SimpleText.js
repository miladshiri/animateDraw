import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { defaultSettings } from "../shapeToComponentMapping";

const SimpleText = ({ size, shapeSettings }) => {
  const [fontSize, setFontSize] = useState(0);
  const textInputRef = useRef(null);
  const [displayText, setDisplayText] = useState(shapeSettings.text || "");

  let speed = 1;
  if (shapeSettings.animationSpeed === "slow") {
    speed = 2;
  } else if (shapeSettings.animationSpeed === "normal") {
    speed = 1;
  } else if (shapeSettings.animationSpeed === "fast") {
    speed = 0.5;
  }

  useEffect(() => {
    setFontSize((shapeSettings.fontSizeRate * (size.w + size.h)) / 2);
  }, [size, shapeSettings]);

  useEffect(() => {
    setDisplayText(shapeSettings.text || "");
  }, [shapeSettings.text]);

  const getAnimationStyle = () => {
    if (!shapeSettings.textAnimation) return {};

    switch (shapeSettings.textAnimation) {
      case "color-fade":
        return {
          animate: {
            opacity: [1, 0.2, 1],
          },
          transition: {
            duration: 2 * speed,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      case "shake":
        return {
          animate: {
            x: [0, -5, 5, -5, 5, 0],
          },
          transition: {
            duration: 0.5 * speed,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      case "pulse":
        return {
          animate: {
            scale: [1, 1.1, 1],
          },
          transition: {
            duration: 1 * speed,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      case "typewriter":
        return {
          animate: {
            x: ["-100%", "100%"]
          },
          transition: {
            duration: 2 * speed,
            repeat: Infinity,
            repeatDelay: 1 * speed,
            ease: "linear"
          }
        };
      case "scan-reverse":
        return {
          animate: {
            x: ["100%", "-100%"]
          },
          transition: {
            duration: 2 * speed,
            repeat: Infinity,
            repeatDelay: 1 * speed,
            ease: "linear"
          }
        };
      default:
        return {};
    }
  };

  const isGradient = shapeSettings.textAnimation === "gradient";

  const scaledText = (
    <div
      ref={textInputRef}
      className={isGradient ? "gradient-text" : ""}
      style={{
        fontSize: "16px",
        whiteSpace: "pre",
        transform: `scaleX(${size.w / (textInputRef.current?.scrollWidth || 1)}) scaleY(${size.h / (textInputRef.current?.scrollHeight || 1)})`,
        transformOrigin: "center center",
        overflow: "visible",
        width: "max-content",
        color: isGradient ? "transparent" : shapeSettings.textColor,
        WebkitTextStroke: isGradient
          ? "0px transparent"
          : `${
               0.3
            }px ${
              shapeSettings?.borderColor ||
              defaultSettings["SimpleText"].borderColor
            }`,
        textStroke: isGradient
          ? "0px transparent"
          : `${
               0.3
            }px ${
              shapeSettings?.borderColor ||
              defaultSettings["SimpleText"].borderColor
            }`,
      }}
    >
      {displayText}
    </div>
  );

  return (
    <>
      <div
        style={{
          width: size.w,
          height: size.h,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible",
          position: "relative"
        }}
      >
        {shapeSettings.textAnimation === "shake" ? (
          <motion.div key={speed} style={{ position: "relative" }} {...getAnimationStyle()}>
            {scaledText}
          </motion.div>
        ) : shapeSettings.textAnimation === "gradient" ? (
          <div className="gradient-wrapper">{scaledText}</div>
        ) : shapeSettings.textAnimation === "typewriter" || shapeSettings.textAnimation === "scan-reverse" ? (
          <div style={{ position: "relative", overflow: "hidden", width: "100%", height: "100%" }}>
            <motion.div
              key={speed}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                left: 0
              }}
              {...getAnimationStyle()}
            >
              {scaledText}
            </motion.div>
          </div>
        ) : (
          <motion.div
            key={speed}
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getAnimationStyle()}
          >
            {scaledText}
          </motion.div>
        )}
      </div>

      {/* Gradient Text Animation Styles */}
      <style>{`
        .gradient-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        .gradient-text {
          background: linear-gradient(
            to right,
            hsl(0, 0%, 100%),
            hsl(180, 100%, 50%),
            hsl(240, 100%, 50%),
            hsl(270, 100%, 50%),
            hsl(330, 40%, 70%),
            hsl(0, 100%, 50%),
            hsl(60, 100%, 50%),
            hsl(90, 100%, 75%),
            hsl(0, 0%, 100%)
          );
          background-size: 900% auto;
          animation: gradientShift 6s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </>
  );
};

export default SimpleText;
