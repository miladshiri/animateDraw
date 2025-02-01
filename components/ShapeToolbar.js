import Tabs from "./Tabs";
import { Home, Info, Mail } from "lucide-react"; // Import Lucide icons

const ShapeToolbar = ({setShapeToCreate, shapeToCreate}) => {

  const shapeCategories = [
    {name:"square", icon: <Home />, assets: 
      [
        {name:"amazing", component: "AnimatedRec"},
        {name:"amazing2", component: "Cube3d"},
        {name:"amazing3", component: "AnimatedRec1"},
        {name:"amazing4", component: "AnimatedRec1"},
        {name:"amazing5", component: "AnimatedRec1"},
        {name:"amazing6", component: "AnimatedRec1"},
      ]
    },
    {name:"circle", icon: <Info />, assets: [

    ]
  },
    {name:"3d", icon: <Info />, assets: [

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