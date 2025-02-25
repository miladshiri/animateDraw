import AnimatedRec from "./shapes/AnimatedRec";
import AnimatedRecRotate from "./shapes/AnimatedRecRotate";
import Cube3d from "./shapes/Cube3d";
import SimpleImage from "./shapes/SimpleImage";
import SimpleText from "./shapes/SimpleText";
import AnimatedCircle from "./shapes/AnimatedCircle";
import Arrow from "./shapes/Arrow";
import Diamond3d from "./shapes/Diamond3d";

  export const defaultSettings = {
    "AnimatedRec": {animationSpeed: "normal", shapeColor: "#2a2a2a", borderColor: "#51b39a", flowColor: "#aaaaaa"},
    "AnimatedCircle": {animationSpeed: "normal", shapeColor: "#2a2a2a", borderColor: "#51b39a", flowColor: "#aaaaaa"},
    "AnimatedRecRotate": {animationSpeed: "normal", shapeColor: "#1b14f5", borderColor: "#ffffff", flowColor: "#e30707"},
    "Cube3d": {animationSpeed: "normal", animationSpeedOff: "no", shapeColor: "#00ee00", textColor: "#00f01c", shapeText: "Text"},
    "SimpleText": {animationSpeed: "fast", textColor: "#fff", fontSize: 26},
    "Arrow": {animationSpeed: "slow", thickness: "normal", shapeColor: "#00ee00", flowColor: "#e30707", startX: 0, startY: 0, endX: 100, endY: 100, head: "end"},
    "Diamond3d": {animationSpeed: "normal", animationSpeedOff: "no", shapeColor: "#00ee00", textColor: "#00f01c", shapeText: "Text"},
  }
  
  export const getComponentByName = (componentName) => {
    return components[componentName] || null;
  };

  const components = {
    "AnimatedRec": AnimatedRec,
    "AnimatedCircle": AnimatedCircle,
    "AnimatedRecRotate": AnimatedRecRotate,
    "Cube3d": Cube3d, 
    "SimpleImage": SimpleImage,
    "SimpleText": SimpleText,
    "Arrow": Arrow,
    "Diamond3d": Diamond3d
  };

  export default components;