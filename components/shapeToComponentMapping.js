import AnimatedRec from "./shapes/AnimatedRec";
import Cube3d from "./shapes/Cube3d";

  const components = {
    "AnimatedRec": AnimatedRec,
    "Cube3d": Cube3d
  };
  
  export const getComponentByName = (componentName) => {
    return components[componentName] || null;
  };
  
  export default components;