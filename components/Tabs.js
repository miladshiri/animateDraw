import { useState } from "react";
import React from "react";

import { Home, Info, Mail } from "lucide-react"; // Import Lucide icons

export default function Tabs({tabs}) {
  const [activeTab, setActiveTab] = useState(0);

  // // Tab data with icons
  // const tabs = [
  //   { icon: <Home size={24} />, content: "Welcome to the Home tab!" },
  //   { icon: <Info size={24} />, content: "Learn more about us in this tab." },
  //   { icon: <Mail size={24} />, content: "Reach out to us through this tab." },
  // ];

  return (
    <div className="tabs-container">
      {/* Tab Headers */}
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.icon}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {tabs[activeTab].assets.map((asset, index) => (
 
            <div
              key={index}
              style={{
                width: "30px",
                height: "30px",
                margin: "4px",
              }}
            >
              {React.createElement(asset.component, {size:{w:30, h:30}}) }
            </div>
        ))}
      </div>

      {/* Styles */}
      <style jsx>{`
        .tabs-container {
          position: absolute,
          width: 100%;
          max-width: 500px;
          margin: auto;
          text-align: center;
          background: rgba(48, 48, 48, 0.95);
          padding: 2px;
          border-radius: 10px;
        }
        .tabs-header {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 15px;
          border-bottom: 1px solid #aaaaaa;
        }
        .tab-content {
          padding: 5px;
          font-size: 18px;
          color: #ededed;
          background: rgba(48, 48, 48, 0.95);
          border-radius: 5px;
          display: grid;
          grid-template-columns: auto auto auto auto;
        }
      `}</style>
    </div>
  );
}