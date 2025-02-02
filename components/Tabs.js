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
                width: "25px",
                height: "25px",
                margin: "1px",
              }}
            >
              {React.createElement(getComponentByName(asset.component), {size:{w:25, h:25}}) }
            </div>
            </div>
        ))}
      </div>


    </div>
  );
}