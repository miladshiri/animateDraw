import AnimatedRec from "./shapes/AnimatedRec";
import Cube3d from "./shapes/Cube3d";
import SimpleImage from "./shapes/SimpleImage";
import SimpleText from "./shapes/SimpleText";

  const components = {
    "AnimatedRec": AnimatedRec,
    "Cube3d": Cube3d, 
    "AnimatedRec1": AnimatedRec,
    "SimpleImage": SimpleImage,
    "SimpleText": SimpleText,
  };
  
  export const getComponentByName = (componentName) => {
    return components[componentName] || null;
  };
  
  export default components;