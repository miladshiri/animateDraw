import Tabs from "./Tabs";
import { Square, Circle, Box, ArrowLeftRight } from "lucide-react"; // Import Lucide icons

const ShapeToolbar = ({setShapeToCreate, shapeToCreate}) => {

  const shapeCategories = [
    {name:"square", icon: <Square />, assets: 
      [
        {name:"amazing", component: "AnimatedRec"},
      ]
    },
    {name:"circle", icon: <Circle />, assets: 
      [

      ]
    },
    {name:"arrow", icon: <ArrowLeftRight />, assets: 
      [

      ]
    },
    {name:"3d", icon: <Box />, assets: 
      [
      {name:"amazing2", component: "Cube3d"},
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