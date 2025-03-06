import Tabs from "./Tabs";
import { Square, Circle, Box, ArrowLeftRight } from "lucide-react"; // Import Lucide icons

const ShapeToolbar = ({setShapeToCreate, shapeToCreate}) => {

  const shapeCategories = [
    {name:"square", icon: <Square />, assets: 
      [
        {name:"Single Flow Rect", component: "AnimatedRec"},
        {name:"Double Flow Rect", component: "AnimatedRecRotate"},
      ]
    },
    {name:"circle", icon: <Circle />, assets: 
      [
        {name:"Single Flow Circle", component: "AnimatedCircle"},

      ]
    },
    {name:"arrow", icon: <ArrowLeftRight />, assets: 
      [
        {name:"Flow Arrow", component: "Arrow"},
      ]
    },
    {name:"3d", icon: <Box />, assets: 
      [
      {name:"Cube 3D", component: "Cube3d"},
      {name:"Diomond 3D", component: "Diamond3d"},
      ]
    },
    {name:"3d", icon: <Box />, assets: 
      [
      {name:"Robot Wave Hand", component: "RobotHandShake"},
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