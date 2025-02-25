import { useState } from "react";
import { Menu, ScanSearch } from "lucide-react";
import Image from "next/image";


const LogoBar = () => {

  const [showMenu, setShowMenu] = useState(false);

  const handleMenuButton = (e) => {
    setShowMenu((prev) => !prev);
  }

  const toolbarStyle = {
    position: "fixed",
    bottom: "10px",
    left: "2px",
    transform: "translateX(5%)",
    width: "210px", // 1/4 of the screen width
    backgroundColor: !showMenu ? "rgba(48, 48, 48, 0.95)" : "rgb(255, 255, 255)",
    boxShadow: !showMenu ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "", // Shadow effect
    borderRadius: "8px", // Slightly rounded corners
    padding: "10px",
    zIndex: 1000, // Ensures it stays on top of other elements
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };

  return (
    <div
      style={{
        display: "flex",
        zIndex: 1000, // Ensures it stays on top of other elements

        
      }}
    >
    <div className="toolbar" style={toolbarStyle}>

      <button
        className={showMenu ? "isSelected" : ""}
        onMouseUp={(event) => event.stopPropagation()}
        onMouseDown={(event) => handleMenuButton(event)}
      >
        <Menu size={22} strokeWidth={1} />
      </button>

      <Image
        style={{
          
          WebkitFilter: "drop-shadow(5px 5px 5px #222)",
          filter: "drop-shadow(5px 5px 100px #222)",
          zIndex: "1000"
        }}
        src="/mainLogo.png"
        alt="flowyBoard"
        width={160}
        height={70}
      />
    </div>
    {showMenu && 
    <div
      style={{
        backgroundColor: `rgb(255, 255, 255)`,
        height: "200px",
        position: "fixed",
        bottom: "10px",
        left: "2px",
        transform: "translateX(5%)",
        width: "210px",
        borderRadius: "8px",
        padding: '10px',
        boxShadow: '4px 0px 0px 0px rgb(211, 211, 211)',
        color: '#1b1b1f'
      }}
    >
      dsfasfasdf
    </div>
}
    </div>
  )
}

export default LogoBar;