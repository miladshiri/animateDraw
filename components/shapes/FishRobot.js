import { useState, useEffect, useId } from "react";
import { defaultSettings } from "../shapeToComponentMapping";

const FishRobot = ({ size, shapeSettings, scale }) => {
  const [isHovered, setIsHovered] = useState(false);
  const uniqueId = useId().replace(/:/g, ''); // Remove colons from the ID
  var speed = 4;

  if (shapeSettings) {
    if (shapeSettings.animationSpeed == 'slow') {
      speed = 8;
    }
    else if (shapeSettings.animationSpeed == 'normal') {
      speed = 4;
    }
    else if (shapeSettings.animationSpeed == 'fast') {
      speed = 2;
    }
  }

  // Calculate base unit based on size - original code used 300px as base
  const baseUnit = Math.min(size.w, size.h) / 300; // 300 is our base unit for calculations
  
  // Get colors from settings or use defaults
  const shapeColor = shapeSettings ? (shapeSettings.shapeColor ? shapeSettings.shapeColor : defaultSettings['FishRobot'].shapeColor) : defaultSettings['FishRobot'].shapeColor;
  const flowColor = shapeSettings ? (shapeSettings.flowColor ? shapeSettings.flowColor : defaultSettings['FishRobot'].flowColor) : defaultSettings['FishRobot'].flowColor;

  return (
    <div style={{ padding: `${baseUnit * 5}px` }}>
      <div className="submarine" style={{
        display: 'block',
        position: 'relative',
        height: `${baseUnit * 300}px`,
        width: `${baseUnit * 300}px`,
        padding: `${baseUnit * 30}px ${baseUnit * 50}px ${baseUnit * 30}px ${baseUnit * 150}px`,
        margin: '0 auto 0 auto',
        animation: `diving ${speed * 3000}ms ease-in-out infinite, diving-rotate ${speed * 3000}ms ease-in-out infinite`,
      }}>
        <div className="submarine-body" style={{
          width: `${baseUnit * 150}px`,
          height: `${baseUnit * 80}px`,
          position: 'absolute',
          marginTop: `${baseUnit * 50}px`,
          left: `${baseUnit * 25}px`,
          backgroundColor: shapeColor,
          borderRadius: `${baseUnit * 40}px`,
          background: `linear-gradient(${shapeColor}, ${flowColor})`,
        }}>
          <div className="window" style={{
            width: `${baseUnit * 37}px`,
            height: `${baseUnit * 37}px`,
            position: 'absolute',
            marginTop: `${baseUnit * 23}px`,
            right: `${baseUnit * 18}px`,
            background: `linear-gradient(${flowColor}, ${shapeColor})`,
            borderRadius: '50%',
            border: `${baseUnit * 3}px solid ${shapeColor}`,
          }}></div>
          
          <div className="engine" style={{
            width: `${baseUnit * 30}px`,
            height: `${baseUnit * 30}px`,
            position: 'absolute',
            marginTop: `${baseUnit * 32}px`,
            left: `${baseUnit * 53}px`,
            backgroundColor: flowColor,
            borderRadius: '50%',
            border: `${baseUnit * 5}px solid ${shapeColor}`,
            animation: `spin ${speed * 900}ms linear infinite`,
          }}></div>
          
          <div className="light" style={{
            position: 'absolute',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: `0 ${baseUnit * 40}px ${baseUnit * 150}px ${baseUnit * 40}px`,
            borderColor: `transparent transparent ${flowColor} transparent`,
            transform: 'rotate(-50deg)',
            top: `${baseUnit * 40}px`,
            left: '99%',
            animation: `light-movement ${speed * 1000}ms ease-in-out infinite`,
          }}></div>
        </div>
        
        <div className="helix" style={{
          width: `${baseUnit * 30}px`,
          height: `${baseUnit * 70}px`,
          position: 'absolute',
          marginTop: `${baseUnit * 55}px`,
          left: 0,
          backgroundColor: shapeColor,
          borderRadius: `${baseUnit * 7}px`,
          background: `linear-gradient(${shapeColor}, ${flowColor})`,
        }}>
          <div style={{
            content: '""',
            position: 'absolute',
            marginTop: `${baseUnit * 5}px`,
            marginLeft: `${baseUnit * 7}px`,
            width: `${baseUnit * 17}px`,
            height: `${baseUnit * 60}px`,
            borderRadius: `${baseUnit * 3}px`,
            background: `linear-gradient(
              to bottom,
              ${shapeColor},
              ${shapeColor} 50%,
              ${flowColor} 50%,
              ${flowColor}
            )`,
            backgroundSize: '100% 20px',
            animation: `helix-movement ${speed * 110}ms linear infinite`,
          }}></div>
        </div>
        
        <div className="hat" style={{
          width: `${baseUnit * 65}px`,
          height: `${baseUnit * 25}px`,
          position: 'absolute',
          marginTop: `${baseUnit * 26}px`,
          left: `${baseUnit * 70}px`,
          backgroundColor: shapeColor,
          borderRadius: `${baseUnit * 10}px ${baseUnit * 10}px 0 0`,
          background: `linear-gradient(${shapeColor}, ${flowColor})`,
        }}>
          <div className="periscope" style={{
            position: 'absolute',
            width: `${baseUnit * 7}px`,
            height: `${baseUnit * 20}px`,
            backgroundColor: shapeColor,
            marginTop: `${-baseUnit * 27}px`,
            marginLeft: `${baseUnit * 32}px`,
            borderRadius: `${baseUnit * 5}px ${baseUnit * 5}px 0 0`,
          }}></div>
          <div className="leds-wrapper" style={{
            width: `${baseUnit * 53}px`,
            height: `${baseUnit * 13}px`,
            position: 'relative',
            top: `${baseUnit * 7}px`,
            left: `${baseUnit * 7}px`,
            backgroundColor: shapeColor,
            borderRadius: `${baseUnit * 10}px`,
            background: `linear-gradient(${flowColor}, ${shapeColor})`,
          }}>
            <div className="leds" style={{
              position: 'absolute',
              marginTop: `${baseUnit * 4}px`,
              marginLeft: `${baseUnit * 7}px`,
              width: `${baseUnit * 5}px`,
              height: `${baseUnit * 5}px`,
              borderRadius: '50%',
              backgroundColor: flowColor,
              animation: `leds-off ${speed * 500}ms linear infinite`,
            }}></div>
          </div>
        </div>
      </div>

      <style jsx>
      {`
        @keyframes spin { 
          100% { 
            transform:rotate(360deg); 
          } 
        }

        @keyframes leds-off { 
          100% { 
            opacity:0.3;
          } 
        }

        @keyframes diving {
          0% {
            margin-top: ${baseUnit * 5}px;
          }
          50% {
            margin-top: ${baseUnit * 15}px;
          }
          100% {
            margin-top: ${baseUnit * 5}px;
          }
        }

        @keyframes diving-rotate {
          0% {
            transform:rotate(0deg); 
          }
          50% {
            transform:rotate(3deg); 
          }
          75% {
            transform:rotate(-2deg); 
          }
          100% {
            transform:rotate(0deg); 
          }
        }

        @keyframes helix-movement {
          100% {
            background: linear-gradient(
              to bottom,
              ${flowColor} 50%,
              ${flowColor},
              ${shapeColor},
              ${shapeColor} 50%
            );
            backgroundSize: '100% 20px';
          }
        }

        @keyframes light-movement {
          0% { 
            transform: rotate(-50deg);
          }
          50% {
            transform: rotate(-60deg);
          }
          100% { 
            transform: rotate(-50deg);
          }
        }
      `}
      </style>
    </div>
  );
};

export default FishRobot; 