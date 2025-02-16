import AnimatedRec from "./shapes/AnimatedRec";
import AnimatedRecRotate from "./shapes/AnimatedRecRotate";
import Cube3d from "./shapes/Cube3d";
import SimpleImage from "./shapes/SimpleImage";
import SimpleText from "./shapes/SimpleText";

  export const defaultSettings = {
    "AnimatedRec": {animationSpeed: "fast", shapeColor: "#2a2a2a", borderColor: "#51b39a"},
    "AnimatedRecRotate": {animationSpeed: "fast", shapeColor: "#1b14f5", borderColor: "#ffffff", flowColor: "#e30707"},
    "Cube3d": {animationSpeed: "fast", shapeColor: "#00ee00"},
    "SimpleText": {animationSpeed: "fast", textColor: "#fff", fontSize: 26},
  }
  
  export const getComponentByName = (componentName) => {
    return components[componentName] || null;
  };

  const components = {
    "AnimatedRec": AnimatedRec,
    "AnimatedRecRotate": AnimatedRecRotate,
    "Cube3d": Cube3d, 
    "SimpleImage": SimpleImage,
    "SimpleText": SimpleText,
  };

  export default components;