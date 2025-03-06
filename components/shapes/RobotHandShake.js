import { useState, useEffect } from "react";
import { defaultSettings } from "../shapeToComponentMapping";

const RobotHandShake = ({ size, shapeSettings, scale }) => {
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

  return (
    <div>
      <x>
        <x-head></x-head>
        <x-body></x-body>
        <x-hand></x-hand>
      </x>


      <style jsx>
      {`
        @-webkit-keyframes shadow {
  from {
    transform: translate(0, -1.25vmin) scale(1, 1);
    background-color: rgba(0, 0, 0, 0.1);
  }
  to {
    transform: translate(0, 0) scale(1.3, 1);
    background-color: rgba(0, 0, 0, 0.05);
  }
}
@keyframes shadow {
  from {
    transform: translate(0, -1.25vmin) scale(1, 1);
    background-color: rgba(0, 0, 0, 0.1);
  }
  to {
    transform: translate(0, 0) scale(1.3, 1);
    background-color: rgba(0, 0, 0, 0.05);
  }
}
@-webkit-keyframes hover {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(0, -1.25vmin);
  }
}
@keyframes hover {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(0, -1.25vmin);
  }
}
@-webkit-keyframes beat {
  0% {
    background-color: rebeccapurple;
    box-shadow: 0 0 0 0 rgba(220, 20, 60, 0.3);
  }
  50%, 70% {
    background-color: powderblue;
    box-shadow: 0 0 10vmin 12.5vmin rgba(176, 224, 230, 0);
  }
  100% {
    background-color: rebeccapurple;
  }
}
@keyframes beat {
  0% {
    background-color: rebeccapurple;
    box-shadow: 0 0 0 0 rgba(220, 20, 60, 0.3);
  }
  50%, 70% {
    background-color: powderblue;
    box-shadow: 0 0 10vmin 12.5vmin rgba(176, 224, 230, 0);
  }
  100% {
    background-color: rebeccapurple;
  }
}
@-webkit-keyframes wave {
  from {
    transform: rotate(15deg);
  }
  to {
    transform: rotate(80deg);
  }
}
@keyframes wave {
  from {
    transform: rotate(15deg);
  }
  to {
    transform: rotate(80deg);
  }
}
@-webkit-keyframes wobble {
  0% {
    transform: translate(-0.25vmin, 0);
    background-color: crimson;
    box-shadow: 0 0 0 0 rgba(220, 20, 60, 0.3);
  }
  50%, 70% {
    transform: translate(0.25vmin, 0);
    background-color: mediumvioletred;
    box-shadow: 0 0 10vmin 12.5vmin rgba(220, 20, 60, 0);
  }
  100% {
    transform: translate(-0.25vmin, 0);
    background-color: rebeccapurple;
  }
}
@keyframes wobble {
  0% {
    transform: translate(-0.25vmin, 0);
    background-color: crimson;
    box-shadow: 0 0 0 0 rgba(220, 20, 60, 0.3);
  }
  50%, 70% {
    transform: translate(0.25vmin, 0);
    background-color: mediumvioletred;
    box-shadow: 0 0 10vmin 12.5vmin rgba(220, 20, 60, 0);
  }
  100% {
    transform: translate(-0.25vmin, 0);
    background-color: rebeccapurple;
  }
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}


x {
  display: block;
  position: relative;
  -webkit-animation: hover 1500ms ease-in-out alternate infinite;
          animation: hover 1500ms ease-in-out alternate infinite;
}
x-head {
  width: 25vmin;
  height: 12.5vmin;
  display: block;
  position: relative;
  border-radius: 6.25vmin;
  background-color: black;
  box-shadow: 0 0 0 3.25vmin white inset;
  transition: transform ease-in-out 350ms;
}
x-head::before {
  content: "";
  display: block;
  width: 4vmin;
  height: 4vmin;
  position: absolute;
  top: -10vmin;
  left: 10.5vmin;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 1vmin 0 -1.5vmin white, 0 0.5vmin 0 -1.5vmin white, 0 1vmin 0 -1.5vmin white, 0 1.5vmin 0 -1.5vmin white, 0 2vmin 0 -1.5vmin white, 0 2.5vmin 0 -1.5vmin white, 0 3vmin 0 -1.5vmin white, 0 3.5vmin 0 -1.5vmin white, 0 4vmin 0 -1.5vmin white, 0 4.5vmin 0 -1.5vmin white, 0 5vmin 0 -1.5vmin white, 0 5.5vmin 0 -1.5vmin white, 0 6vmin 0 -1.5vmin white, 0 6.5vmin 0 -1.5vmin white, 0 7vmin 0 -1.5vmin white, 0 7.5vmin 0 -1.5vmin white, 0 8vmin 0 -1.5vmin white;
}
x-head::after {
  content: "";
  display: block;
  width: 3.75vmin;
  height: 3.75vmin;
  position: absolute;
  top: 4.5vmin;
  left: 4.5vmin;
  border-radius: 1.875vmin;
  background-color: powderblue;
  box-shadow: 12.25vmin 0 powderblue;
  transition: inherit;
}
x-head:hover {
  transform: rotate(15deg) translate(2.5vmin, 0);
}
x-head:hover::after {
  transform: scale(1, 0.1);
}
x-body {
  width: 20vmin;
  height: 22.5vmin;
  position: absolute;
  top: 15vmin;
  left: 2.5vmin;
  display: block;
  overflow: hidden;
  border-radius: 50% 50% 50% 50%/30% 30% 70% 70%;
  background: white;
}
x-body::after {
  content: "";
  display: block;
  width: 3.75vmin;
  height: 3.75vmin;
  position: absolute;
  top: 6.25vmin;
  left: 12vmin;
  border-radius: 50%;
  -webkit-animation: beat 4500ms linear infinite;
          animation: beat 4500ms linear infinite;
}
x-body:hover::after {
  -webkit-animation: wobble 1000ms linear infinite;
          animation: wobble 1000ms linear infinite;
}
x-hand {
  width: 8.5vmin;
  height: 8.5vmin;
  position: absolute;
  top: 7.5vmin;
  left: 21.25vmin;
  display: block;
  border-radius: 50%;
  transform-origin: 50% 12vmin;
  box-shadow: 0 7.5vmin 0 -2.5vmin white;
  -webkit-animation: wave 1000ms alternate ease-in-out infinite;
          animation: wave 1000ms alternate ease-in-out infinite;
}
x-hand::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-clip-path: polygon(0% 0%, 50% 50%, 100% 0%, 100% 100%, 0% 100%);
          clip-path: polygon(0% 0%, 50% 50%, 100% 0%, 100% 100%, 0% 100%);
  border-radius: 50%;
  box-shadow: 0 0 0 2.5vmin white inset;
}
x::after {
  content: "";
  display: block;
  width: 15vmin;
  height: 3.75vmin;
  position: absolute;
  top: 40vmin;
  left: 5vmin;
  border-radius: 50%;
  -webkit-animation: shadow 1500ms ease-in-out alternate infinite;
          animation: shadow 1500ms ease-in-out alternate infinite;
}
      `}
      </style>
    </div>
  )
}

export default RobotHandShake;