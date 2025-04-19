import Tabs from "./Tabs";
import { Square, Circle, Box, ArrowLeftRight, Bot, Loader } from "lucide-react"; // Import Lucide icons

const ShapeToolbar = ({setShapeToCreate, shapeToCreate}) => {

  const shapeCategories = [
    {name:"square", icon: <Square />, assets: 
      [
        {name:"Single Flow Rect", component: "AnimatedRec"},
        {name:"Double Flow Rect", component: "AnimatedRecRotate"},
        {name:"Gradient Rect", component: "GradientRect"},
        {name:"Full Gradient Rect", component: "FullGradientRect"},
        {name:"Square Dots", component: "LoaderRect"},
      ]
    },
    {name:"circle", icon: <Circle />, assets: 
      [
        {name:"Single Flow Circle", component: "AnimatedCircle"},
        {name:"Pulsing Red Circle", component: "AnimatedRedCircle"},
        {name:"Circle Dots", component: "LoaderCircle"},
      ]
    },
    {name:"arrow", icon: <ArrowLeftRight />, assets: 
      [
        {name:"Flow Arrow", component: "Arrow"},
        {name:"Bar Arrow", component: "ArrowBar"},
      ]
    },
    {name:"3d", icon: <Box />, assets: 
      [
      {name:"Cube 3D", component: "Cube3d"},
      {name:"Diomond 3D", component: "Diamond3d"},
      {name:"Spinning Dots", component: "Loader4"},
      ]
    },
    {name:"misc", icon: <Bot />, assets: 
      [
      {name:"Robot Wave Hand", component: "RobotHandShake"},
      ]
    },
    {name:"loaders", icon: <Loader />, assets: 
      [
      {name:"Line Dots", component: "Loader2"},
      {name:"3D Triangles", component: "Loader5"},
      {name:"Bouncing Balls", component: "Loader6"},
      {name:"Pulsing Waves", component: "Loader7"},
      {name:"Rotating Cube", component: "Loader8"},
      {name:"DNA Helix", component: "Loader9"},
      ]
    },
  ]

  return (
    <div
      className="shape-toolbar toolbar"
    >
      <Tabs tabs={shapeCategories} setShapeToCreate={setShapeToCreate} shapeToCreate={shapeToCreate} />
      
    </div>
  )
}

export default ShapeToolbar;