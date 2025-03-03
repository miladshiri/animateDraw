import { useState, useRef, useEffect } from "react";
import { Menu, ScanSearch, Eraser, Save, MonitorDown } from "lucide-react";
import Image from "next/image";


const LogoBar = () => {

  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const menuRef = useRef(null);

  const handleMenuButton = (e) => {
    setShowMenu((prev) => !prev);
  }

  const handleCleanBoardClick = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    setShowConfirmation(false);
    console.log("Board deleted"); // Replace with actual delete logic
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
        setShowConfirmation(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      ref={menuRef}
      style={{
        display: "flex",
        zIndex: 1000, // Ensures it stays on top of other elements
      }}
      onMouseUp={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
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
      <div className="menu-item" onClick={handleCleanBoardClick}><Eraser size={20} strokeWidth={1} />Clean the Board</div>
      <div className="menu-item"><Save size={20} strokeWidth={1} />Save the Board</div>
      <div className="menu-item"><MonitorDown size={20} strokeWidth={1} />Import a Board</div>
    </div>
}


      {showConfirmation && (
        <div id="clean-board-confirmation" className="confirmation-box">
          <p>Are you sure you want to delete the board?</p>
          <div className="confirm-buttons">
            <button className="yes-btn" onClick={confirmDelete}>Yes</button>
            <button className="no-btn" onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}

    <style jsx>
      {`
        .menu-item {
          padding: 4px;
          padding-bottom: 10px;
          color: rgb(57, 57, 57);
          display: flex;
          justify-content: start;
          align-items: center;
          gap: 4px;
        }

        .menu-item:hover {
          background-color: #223ce5;
          transition: 0.2s ease-in-out;
          border-radius: 5px;
          color: white;
        }

        .confirmation-box {
          position: fixed;
          bottom: 50px;
          left: 2px;
          transform: translateX(5%);
          width: 210px;
          background: white;
          border-radius: 8px;
          padding: 15px;
          box-shadow: 4px 0px 0px 0px rgb(211, 211, 211);
          color: #1b1b1f;
          text-align: center;
          z-index: 1100;
        }

        .confirmation-box p {
          font-size: 14px;
          font-weight: 500;
          color: rgb(57, 57, 57);
          margin-bottom: 10px;
        }

        .confirm-buttons {
          display: flex;
          justify-content: space-between;
        }

        .yes-btn, .no-btn {
          flex: 1;
          margin: 0 5px;
          padding: 8px 0;
          border: none;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
        }

        .yes-btn {
          background-color: #ff4d4d;
          color: white;
        }

        .no-btn {
          background-color: #ccc;
          color: black;
        }

        .yes-btn:hover {
          background-color: #cc0000;
        }

        .no-btn:hover {
          background-color: #999;
        }

      `}
    </style>

    </div>
  )
}

export default LogoBar;