import React, { useEffect, useState, useRef } from 'react';
import { defaultSettings } from '../shapeToComponentMapping';

const Cube3d = ({size, shapeSettings}) => {
  var speed = 4;

  if (shapeSettings) {
    if (shapeSettings.animationSpeed == 'slow') {
      speed = 8;
    }
    else if (shapeSettings.animationSpeed == 'normal') {
      speed = 4;
    }
    else if (shapeSettings.animationSpeed == 'fast') {
      speed = 1;
    }

  }

  const [edgeSize, setEdgeSize] = useState(0);
  const textInputRef = useRef(null);

  useEffect(() => {
    setEdgeSize((size.w + size.h) / 2);
  }, [size])

  const spanStyle = i => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(#151515, ${shapeSettings ? shapeSettings.shapeColor: "#00ee00"})`,
    transform: `rotateY(calc(90deg * ${i})) translateZ(${edgeSize/2}px)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  return (
    <>
    
      <div
        className="cube"
        style={{
          position: "relative",
          width: `${edgeSize}px`,
          height: `${edgeSize}px`,
          transformStyle: "preserve-3d",
          animation: `animate ${speed}s linear infinite`,
        }}
      >
        <div
          style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: `${edgeSize}px`,
              height: `${edgeSize}px`,
              background: `${shapeSettings ? (shapeSettings.shapeColor ? shapeSettings.shapeColor : defaultSettings['Cube3d'].shapeColor) : defaultSettings['Cube3d'].shapeColor}`,
              transform: `rotateX(90deg) translateZ(-${edgeSize * 3/4}px)`,
              filter: `blur(${edgeSize/6}px)`,
          }}
        ></div>
        <div className='top'
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: `${edgeSize}px`,
            height: `${edgeSize}px`,
            background: "#222",
            transform: `rotateX(90deg) translateZ(${edgeSize/2}px)`,
            transformStyle: "preserve-3d",
          }}
        
        ></div>
        <div className='body'
          style={{ position: 'absolute', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
        >
          {[0, 1, 2, 3].map(i => (
            <span key={i} style={spanStyle(i)}>

              <span
                ref={textInputRef}
                style={{
                  padding: "4px",
                  color: `${shapeSettings ? (shapeSettings.textColor ? shapeSettings.textColor : defaultSettings['Cube3d'].textColor) : defaultSettings['Cube3d'].textColor}`,
                  fontSize: `16px`,
                  transform: `scale(${(size.w + size.h) / 2 / (textInputRef.current?.scrollWidth ) || 1}, ${(size.w + size.h) / 2 / (textInputRef.current?.scrollWidth ) || 1  })`
                }}
              >{shapeSettings ? (shapeSettings.shapeText ? shapeSettings.shapeText : defaultSettings['Cube3d'].shapeText) : defaultSettings['Cube3d'].shapeText}</span>
            </span>
          ))}
        </div>
      </div>

<style>
{`

@keyframes animate {
  0% {
    transform: rotateX(-30deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(-30deg) rotateY(360deg);
  }
}


`}
</style>
</>
  );
}

export default Cube3d;



