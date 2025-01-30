import React from 'react';

const Cube3d = ({}) => {
  const spanStyle = i => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(#151515, #00ee00)',
    transform: `rotateY(calc(90deg * ${i})) translateZ(150px)`,
  });

  return (
    <>
    
      <div
        className="cube"
        style={{
          position: "relative",
          width: "300px",
          height: "300px",
          transformStyle: "preserve-3d",
          animation: "animate 6s linear infinite",
        }}
      >
        <div className='top'></div>
        <div className='body'>
          {[0, 1, 2, 3].map(i => (
            <span key={i} style={spanStyle(i)}></span>
          ))}
        </div>
      </div>

<style>
{`

.cube div{
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
transform-style: preserve-3d;
}

@keyframes animate {
  0% {
    transform: rotateX(-30deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(-30deg) rotateY(360deg);
  }
}

.top {
position: absolute;
top: 0;
left: 0;
width: 300px;
height: 300px;
background: #222;
transform: rotateX(90deg) translateZ(150px);
}

.top::before {
content: '';
position: absolute;
top: 0;
left: 0;
width: 300px;
height: 300px;
background: #0f0;
transform: translateZ(-380px);
filter: blur(20px);
}

`}
</style>
</>
  );
}

export default Cube3d;



