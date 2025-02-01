import { useState } from "react";
import React from "react";
import { getComponentByName } from "./shapeToComponentMapping";

export default function Tabs({tabs, setShapeToCreate}) {
  const [activeTab, setActiveTab] = useState(0);


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
              onClick={() => setShapeToCreate(asset.component)}
              key={index}
              style={{
                width: "30px",
                height: "30px",
                margin: "4px",
              }}
            >
              {React.createElement(getComponentByName(asset.component), {size:{w:30, h:30}}) }
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