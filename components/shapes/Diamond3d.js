const Diamond3d = ({ size, shapeSettings }) => {
  const f = 0.1;
  
  // Function to generate styles for different types of triangles (bottom, middle-bottom, middle-top, up)
  const generateTriangleStyles = (type, index) => {
    const baseDelay = type === 'middle-top' ? 2500 : type === 'up' ? 3500 : 3500;
    const rotationY = 45 * index;
    const delay = `-${baseDelay + 1000 * index}ms`;
    let transform = '';

    if (type === 'bottom') {
      transform = `translateY(90px) rotateY(${rotationY}deg) rotateX(35deg) scaleX(0.24) scaleY(-1)`;
    } else if (type === 'middle-bottom') {
      transform = `rotateY(${rotationY}deg) translateY(-11px) translateZ(-34px) rotateX(-50deg) scaleX(0.24) scaleY(0.3)`;
    } else if (type === 'middle-top') {
      const topTransformY = -111;  // Y position for middle-top faces
      const topTranslateZ = -31;   // Z position for middle-top faces
      const rotateX = -58;         // Fixed X rotation for top faces
      const scaleX = 0.13;         // Scale for X axis for top faces
      const scaleY = -0.36;        // Scale for Y axis for top faces

      // For middle-top faces, calculate specific rotations and translations
      transform = `rotateY(${22.5 + 45 * index}deg) translateY(${topTransformY}px) translateZ(${topTranslateZ}px) rotateX(${rotateX}deg) scaleX(${scaleX}) scaleY(${scaleY})`;
    } else if (type === 'up') {
      const upTransformY = -22;    // Y position for up faces
      const rotateX = -70;         // Fixed X rotation for up faces
      const scaleX = 0.13;         // Scale for X axis for up faces
      const scaleY = 0.33;         // Scale for Y axis for up faces

      // For up faces, calculate specific rotations and translations
      transform = `rotateY(${22.5 + 45 * index}deg) translateY(${upTransformY}px) translateZ(0px) rotateX(${rotateX}deg) scaleX(${scaleX}) scaleY(${scaleY})`;
    }

    return { animationDelay: delay, transform };
  };

  return (
    <div>
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
        body {
          background-color: #f1f1f1;
        }

        .wrap {
          position: absolute;
          width: 0;
          height: 0;
          top: 50%;
          left: 50%;
          transform-origin: 0 0;
          transform-style: preserve-3d;
          overflow: visible;
        }

        .triangle {
          position: absolute;
          left: -100px;
          top: -30px;
          width: 0;
          height: 0;
          border-left: 100px solid transparent;
          border-right: 100px solid transparent;
          border-bottom: 100px solid #33afff;
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
          animation: lighting-lighter 12s infinite linear;
          transform-origin: 50% 0%;
        }

        /** ANIMATIONS **/

        .rotor-x {
          transform: rotateX(-22deg);
        }

        .rotor-y {
          animation: spinY 12s infinite linear;
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
            border-bottom-color: #33afff;
          }
          50% {
            border-bottom-color: #bbe8ff;
          }
          100% {
            border-bottom-color: #33afff;
          }
        }

        @keyframes lighting-lighter {
          0% {
            border-bottom-color: #72c8ff;
          }
          50% {
            border-bottom-color: #99eaff;
          }
          100% {
            border-bottom-color: #72c8ff;
          }
        }
      `}</style>
    </div>
  );
};

export default Diamond3d;
