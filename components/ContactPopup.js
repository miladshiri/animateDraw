import { X } from "lucide-react";

const ContactPopup = ({ onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "400px",
        zIndex: 1001,
        color: "#1b1b1f"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0, color: "#1b1b1f" }}>About Us</h2>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "5px",
            color: "#1b1b1f"
          }}
        >
          <X size={20} />
        </button>
      </div>
      <div style={{ lineHeight: "1.6", color: "#1b1b1f" }}>
        <p>Welcome to flowyBoard! We're here to help you create amazing animated and 3D flows and boards.</p>
        <p>However, we are still in beta version, so there might be some bugs and issues. We are a small team based in Finland who are trying to fix bugs and add more features. So be patient please.</p>
        <p>If you have any questions, suggestions, or business inquiries, please reach out to us:</p>
        <p>Email: flowyboard@gmail.com</p>
      </div>
      <div style={{ lineHeight: "1.6", color: "#1b1b1f" }}>
        <p>All data at the moment are saved only in your browser. To make sure you don't lose your data, please save your board regularly.</p>
      </div>
    </div>
  );
};

export default ContactPopup; 