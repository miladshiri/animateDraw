import AnimatedRec from "./shapes/AnimatedRec";
import Cube3d from "./shapes/Cube3d";
import SimpleImage from "./shapes/SimpleImage";

  const components = {
    "AnimatedRec": AnimatedRec,
    "Cube3d": Cube3d, 
    "AnimatedRec1": AnimatedRec,
    "SimpleImage": SimpleImage,
  };
  
  export const getComponentByName = (componentName) => {
    return components[componentName] || null;
  };
  
  export default components;