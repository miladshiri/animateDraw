import AnimatedRec from "./shapes/AnimatedRec";
import Tabs from "./Tabs";
import { Home, Info, Mail } from "lucide-react"; // Import Lucide icons

const ShapeToolbar = ({setShapeToCreate}) => {

  const shapeCategories = [
    {name:"square", icon: <Home />, assets: 
      [
        {name:"amazing", component: AnimatedRec},
        {name:"amazing", component: AnimatedRec},
        {name:"amazing", component: AnimatedRec},
        {name:"amazing", component: AnimatedRec},
        {name:"amazing", component: AnimatedRec},
        {name:"amazing", component: AnimatedRec},
        {name:"amazing", component: AnimatedRec},
        {name:"amazing", component: AnimatedRec},
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
      className="toolbar"
      style={{
        position: "fixed",
        top: "50%", // margin from the top
        left: "10px",
        transform: "translateY(-50%)",
        height: "50%", // 1/4 of the screen width
        width: "18%",
        backgroundColor: "rgba(48, 48, 48, 0.95)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Shadow effect
        borderRadius: "8px", // Slightly rounded corners
        padding: "2px",
        zIndex: 1000, // Ensures it stays on top of other elements
      }}
    >
      <Tabs tabs={shapeCategories} setShapeToCreate={setShapeToCreate}/>
      
    </div>
  )
}

export default ShapeToolbar;