import { Menu, ScanSearch } from "lucide-react";
import Image from "next/image";


const LogoBar = () => {
  const toolbarStyle = {
    position: "fixed",
    bottom: "10px",
    left: "2px",
    transform: "translateX(5%)",
    width: "210px", // 1/4 of the screen width
    backgroundColor: "rgba(48, 48, 48, 0.95)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Shadow effect
    borderRadius: "8px", // Slightly rounded corners
    padding: "10px",
    zIndex: 1000, // Ensures it stays on top of other elements
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };

  return (
    <div className="toolbar" style={toolbarStyle}>

    <button
        onMouseUp={(event) => event.stopPropagation()}
        onMouseDown={(event) => fitScreen(event)}
      >
        <Menu size={22} strokeWidth={1} />
      </button>

      <Image
        style={{
          
          WebkitFilter: "drop-shadow(5px 5px 5px #222)",
          filter: "drop-shadow(5px 5px 5px #222)",
          zIndex: "1000"
        }}
        src="/mainLogo.png"
        alt="flowyBoard"
        width={160}
        height={70}
      />
    </div>
  )
}

export default LogoBar;