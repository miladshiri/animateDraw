import React, { useEffect, useState } from 'react';

const Cube3d = ({size}) => {
  
  const [edgeSize, setEdgeSize] = useState(0);

  useEffect(() => {
    setEdgeSize((size.w + size.h) / 2);
  }, [size])

  const spanStyle = i => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(#151515, #00ee00)',
    transform: `rotateY(calc(90deg * ${i})) translateZ(${edgeSize/2}px)`,
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
          animation: "animate 6s linear infinite",
        }}
      >
        <div
          style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: `${edgeSize}px`,
              height: `${edgeSize}px`,
              background: "#0f0",
              transform: `rotateX(90deg) translateZ(-${edgeSize * 3/4}px)`,
              filter: `blur(${edgeSize/10}px)`,
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
            <span key={i} style={spanStyle(i)}></span>
          ))}
        </div>
      </div>

<style>
{`

// .cube div{
// position: absolute;
// top: 0;
// left: 0;
// width: 100%;
// height: 100%;
// transform-style: preserve-3d;
// }

@keyframes animate {
  0% {
    transform: rotateX(-30deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(-30deg) rotateY(360deg);
  }
}

.top {

}

// .top::before {
// content: '';
// position: absolute;
// top: 0;
// left: 0;
// width: ${edgeSize}px;
// height: ${edgeSize}px;
// background: #0f0;
// transform: translateZ(-${edgeSize / 4}px);
// filter: blur(${edgeSize/10}px);
// }

`}
</style>
</>
  );
}

export default Cube3d;



