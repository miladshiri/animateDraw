import { useState, useEffect } from "react";
import { defaultSettings } from "../shapeToComponentMapping";

const Diamond3d = ({ size, shapeSettings, scale }) => {
  const [borderSize, setBorderSize] = useState(0);
  console.log(borderSize);

    useEffect(() => {
      if (size.h && size.w && !isNaN(size.h) && !isNaN(size.w)) {
        setBorderSize((size.h + size.w) / 2);
      }
    }, [size])

  const shapeColor = shapeSettings ? (shapeSettings.shapeColor ? shapeSettings.shapeColor : defaultSettings['Diamond3d'].shapeColor) : defaultSettings['Diamond3d'].shapeColor

  // Function to generate styles for different types of triangles (bottom, middle-bottom, middle-top, up)
  const generateTriangleStyles = (type, index) => {
    const baseDelay = type === 'middle-top' ? 2500 : type === 'up' ? 3500 : 3500;
    const rotationY = 45 * index;
    const delay = `-${baseDelay + 1000 * index}ms`;
    let transform = '';

    if (type === 'bottom') {
      transform = `translateY(${borderSize * 0.9}px) rotateY(${rotationY}deg) rotateX(35deg) scaleX(0.24) scaleY(-1)`;
    } else if (type === 'middle-bottom') {
      transform = `rotateY(${rotationY}deg) translateY(-${borderSize * 0.1}px) translateZ(-${borderSize / 3}px) rotateX(-50deg) scaleX(0.24) scaleY(0.3)`;
    } else if (type === 'middle-top') {
      const topTransformY = -1 * (borderSize + borderSize * 0.1 );  // Y position for middle-top faces
      const topTranslateZ = -1 * (borderSize * 0.30);   // Z position for middle-top faces
      const rotateX = -58;         // Fixed X rotation for top faces
      const scaleX = 0.13;         // Scale for X axis for top faces
      const scaleY = -0.36;        // Scale for Y axis for top faces

      // For middle-top faces, calculate specific rotations and translations
      transform = `rotateY(${22.5 + 45 * index}deg) translateY(${topTransformY}px) translateZ(${topTranslateZ}px) rotateX(${rotateX}deg) scaleX(${scaleX}) scaleY(${scaleY})`;
    } else if (type === 'up') {
      const upTransformY = -1 * (borderSize * 0.21);    // Y position for up faces
      const rotateX = -70;         // Fixed X rotation for up faces
      const scaleX = 0.13;         // Scale for X axis for up faces
      const scaleY = 0.33;         // Scale for Y axis for up faces

      // For up faces, calculate specific rotations and translations
      transform = `rotateY(${22.5 + 45 * index}deg) translateY(${upTransformY}px) translateZ(0px) rotateX(${rotateX}deg) scaleX(${scaleX}) scaleY(${scaleY})`;
    }

    return { animationDelay: delay, transform };
  };

  return (
    <div
      style={{
        position: "relative",
        top: borderSize * 0.5,
        left: borderSize * 0.5,
        backgroundColor: "red",
        "--shapeColor": shapeColor,
      }}
    >
      <div className="wrap rotor-x">
        <div className="wrap rotor-y">
          <div className="wrap rotor-z">
            {/* Bottom Triangles */}
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={`bottom-${index}`}
                className={`triangle bottom face-${index + 1}`}
                style={generateTriangleStyles('bottom', index)}
              />
            ))}

            {/* Middle-Bottom Triangles */}
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={`middle-bottom-${index}`}
                className={`triangle middle-bottom face-${index + 1}`}
                style={generateTriangleStyles('middle-bottom', index)}
              />
            ))}

            {/* Middle-Top Triangles */}
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={`middle-top-${index}`}
                className={`triangle middle-top face-${index + 1}`}
                style={generateTriangleStyles('middle-top', index)}
              />
            ))}

            {/* Up Triangles */}
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={`up-${index}`}
                className={`triangle up face-${index + 1}`}
                style={generateTriangleStyles('up', index)}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .wrap {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0%;
          left: 0%;
          transform-origin: 0 0;
          transform-style: preserve-3d;
          overflow: visible;
        }

        .triangle {
          position: absolute;
          left: -${borderSize}px;
          top: -${borderSize * 0.3}px;
          width: 0;
          height: 0;
          border-left: ${borderSize}px solid transparent;
          border-right: ${borderSize}px solid transparent;
          border-bottom: ${borderSize}px solid ${shapeColor};
          animation: lighting 12s infinite linear;
        }

        /** Bottom Down **/
        .triangle.bottom {
          transform-origin: 50% 0%;
        }

        /** Middle Down **/
        .triangle.middle-bottom {   
          transform-origin: 50% 0%;
        }

        /** Middle Up **/
        .triangle.middle-top {   
          transform-origin: 50% 100%;
        }

        /** Up Triangles **/
        .triangle.up {
          animation: lighting-lighter 11s infinite linear;
          transform-origin: 50% 0%;
        }

        /** ANIMATIONS **/

        .rotor-x {
          transform: rotateX(-22deg);
        }

        .rotor-y {
          animation: spinY 13s infinite linear;
        }

        .rotor-z {
          /* animation: spinZ 18s infinite linear; */
        }

        @keyframes spinX {
          from {
            transform: rotateX(0);
          }
          to {
            transform: rotateX(360deg);
          }
        }

        @keyframes spinY {
          from {
            transform: rotateY(0);
          }
          to {
            transform: rotateY(360deg);
          }
        }

        @keyframes spinZ {
          from {
            transform: rotateZ(0);
          }
          to {
            transform: rotateZ(360deg);
          }
        }

        @keyframes lighting {
          0% {
            border-bottom-color: var(--shapeColor);
          }
          50% {
            border-bottom-color:rgb(255, 255, 255);
          }
          100% {
            border-bottom-color: var(--shapeColor);
          }
        }

        @keyframes lighting-lighter {
          0% {
            border-bottom-color: var(--shapeColor);
          }
          50% {
            border-bottom-color:rgb(255, 255, 255);
          }
          100% {
            border-bottom-color: var(--shapeColor);
          }
        }
      `}</style>
    </div>
  );
};

export default Diamond3d;
