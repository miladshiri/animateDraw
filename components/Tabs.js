import { useState } from "react";
import React from "react";
import { getComponentByName } from "./shapeToComponentMapping";

export default function Tabs({tabs, setShapeToCreate, shapeToCreate}) {
  const [activeTab, setActiveTab] = useState(0);


  return (
    <div className="tabs-container">
      {/* Tab Headers */}
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? "isSelected" : ""}`}
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
              className={shapeToCreate === asset.component ? "isSelectedSecondary" : ""}
              style={{
                width: "50px",
                height: "50px",
                margin: "1px",
                display: "flex",
                justifyContent: "center",  /* Centers horizontally */
                alignItems: "center",  
              }}
            >
            <div
              onClick={() => setShapeToCreate(asset.component)}
              style={{
                width: "35px",
                height: "35px",
                margin: "1px",
                zIndex: "100",
              }}
            >
              {React.createElement(getComponentByName(asset.component), {size:{w:35, h:35}}) }
            </div>
            </div>
        ))}
      </div>

      <style jsx>{`
        .tabs-container {
          position: absolute;
          width: 100%;
          max-width: 500px;
          margin: auto;
          text-align: center;
          background: rgba(48, 48, 48, 0.95);
          padding: 2px;
          border-radius: 10px;
        }
        .tabs-header {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 15px;
          border-bottom: 1px solid #aaaaaa;
          padding: 8px 12px;
          width: 100%;
        }
        .tab-button {
          width: 100%;
          padding: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: transparent;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }
        .tab-button:hover {
          background: rgb(83, 83, 83);
          transform: translateY(-1px);
        }
        .tab-button.isSelected {
          background: rgb(83, 83, 83);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .tab-content {
          padding: 5px;
          font-size: 18px;
          color: #ededed;
          background: rgba(48, 48, 48, 0.95);
          border-radius: 5px;
          display: grid;
          grid-template-columns: auto auto auto;
        }
        .tab-content div:hover {
          background-color: rgb(83, 83, 83);
          transition: 0.2s ease-in-out;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}