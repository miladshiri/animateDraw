import { useState, useRef, useEffect } from "react";
import { Menu, ScanSearch, Eraser, Save, MonitorDown, Mail } from "lucide-react";
import Image from "next/image";
import { getImageFromIndexedDB, saveImageToIndexedDB, openDatabase, clearImageDatabase } from "@/utils/indexedDBHelper";
import ContactPopup from "./ContactPopup";

const LogoBar = ({ 
  setAllShapes, 
  pushToHistory, 
  allShapes, 
  scale, 
  offset, 
  boardColor,
  setScale,
  setOffset,
  setBoardColor
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [confirmationType, setConfirmationType] = useState(null); // 'delete' or 'import'
  const [importFile, setImportFile] = useState(null);
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleMenuButton = (e) => {
    setShowMenu((prev) => !prev);
  }

  const handleCleanBoardClick = () => {
    setConfirmationType('delete');
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await clearImageDatabase(); // Clear the image database
      setAllShapes([]); // Clear all shapes
      pushToHistory(); // Push the empty state to history
      setShowConfirmation(false);
      setShowMenu(false);
    } catch (error) {
      console.error('Error clearing image database:', error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleSaveBoard = async () => {
    // Get all image shapes
    const imageShapes = allShapes.filter(shape => shape.component === 'SimpleImage');
    
    // Create a map to store image data
    const imageDataMap = {};
    
    // Load all images and convert to base64
    for (const shape of imageShapes) {
      const imageId = shape.settings.imageId;
      if (imageId && !imageDataMap[imageId]) {
        const file = await getImageFromIndexedDB(imageId);
        if (file) {
          const base64Data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
          imageDataMap[imageId] = base64Data;
        }
      }
    }

    const boardData = {
      shapes: allShapes,
      scale,
      offset,
      boardColor,
      images: imageDataMap // Include the image data
    };

    const blob = new Blob([JSON.stringify(boardData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flowyBoard-${new Date().toISOString().split('T')[0]}.fb`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowMenu(false);
  };

  const handleImportBoard = () => {
    fileInputRef.current.click();
  };

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.fb')) {
      setImportFile(file);
      setConfirmationType('import');
      setShowConfirmation(true);
    } else {
      alert('Please select a valid flowyBoard file (.fb)');
    }
    // Reset the file input value to allow selecting the same file again
    e.target.value = '';
  };

  const confirmImport = async () => {
    if (importFile) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const boardData = JSON.parse(event.target.result);
          
          // Clear existing images before importing new ones
          await clearImageDatabase();
          
          // Handle image data if present
          if (boardData.images) {
            for (const [imageId, base64Data] of Object.entries(boardData.images)) {
              // Convert base64 to blob
              const response = await fetch(base64Data);
              const blob = await response.blob();
              
              // Save to IndexedDB with the original ID
              const db = await openDatabase();
              const transaction = db.transaction("images", "readwrite");
              const store = transaction.objectStore("images");
              store.put({ id: imageId, image: blob });
            }
          }
          
          setAllShapes(boardData.shapes);
          setScale(boardData.scale);
          setOffset(boardData.offset);
          setBoardColor(boardData.boardColor);
          pushToHistory();
          setShowMenu(false);
        } catch (error) {
          console.error('Error parsing board file:', error);
          alert('Error importing board file. Please make sure it\'s a valid flowyBoard file.');
        }
      };
      reader.readAsText(importFile);
    }
    setShowConfirmation(false);
    setImportFile(null);
    setConfirmationType(null);
  };

  const cancelImport = () => {
    setShowConfirmation(false);
    setImportFile(null);
    setConfirmationType(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
        setShowConfirmation(false);
        setImportFile(null);
        setConfirmationType(null);
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
    width: "210px",
    backgroundColor: !showMenu ? "rgba(48, 48, 48, 0.95)" : "rgb(255, 255, 255)",
    boxShadow: !showMenu ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "",
    borderRadius: "8px",
    padding: "10px",
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };

  return (
    <div
      ref={menuRef}
      style={{
        display: "flex",
        zIndex: 1000,
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

      <input
        type="file"
        accept=".fb"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileImport}
      />

      {showMenu && 
        <div
          style={{
            backgroundColor: `rgb(255, 255, 255)`,
            height: "250px",
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
          <div className="menu-item" onClick={handleSaveBoard}><Save size={20} strokeWidth={1} />Save the Board</div>
          <div className="menu-item" onClick={handleImportBoard}><MonitorDown size={20} strokeWidth={1} />Import a Board</div>
          <div className="menu-item" onClick={() => setShowContactPopup(true)}><Mail size={20} strokeWidth={1} />Contact Us</div>
        </div>
      }

      {showContactPopup && <ContactPopup onClose={() => setShowContactPopup(false)} />}

      {showConfirmation && (
        <div id="clean-board-confirmation" className="confirmation-box">
          <p>{confirmationType === 'delete' 
            ? "Are you sure you want to delete the board?"
            : "Are you sure you want to import this board? This will replace your current board."}</p>
          <div className="confirm-buttons">
            <button className="yes-btn" onClick={confirmationType === 'delete' ? confirmDelete : confirmImport}>Yes</button>
            <button className="no-btn" onClick={confirmationType === 'delete' ? cancelDelete : cancelImport}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoBar;