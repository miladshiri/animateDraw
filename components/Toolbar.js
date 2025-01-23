"use client";

import React, { useState } from "react";

const Toolbar = ({ setSelectedTool }) => {
  const toolbarStyle = {
    position: "fixed",
    top: "10px", // margin from the top
    left: "50%",
    transform: "translateX(-50%)",
    width: "25%", // 1/4 of the screen width
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Shadow effect
    borderRadius: "8px", // Slightly rounded corners
    padding: "10px",
    zIndex: 1000, // Ensures it stays on top of other elements
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const shapeStyle = (shapeType) => ({
    width: shapeType === "circle" ? "40px" : "50px",
    height: "40px",
    backgroundColor: "#4CAF50",
    borderRadius: shapeType === "circle" ? "50%" : "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  });

  const handleMouseDown = (e, tool) => {
    e.stopPropagation();

    console.log(`${tool} selcted`);
    setSelectedTool(tool);
  }

  return (
    <div style={toolbarStyle}>
      <div onMouseDown={(event) => handleMouseDown(event, "pan")} style={shapeStyle("circle")}>Pan</div>
      <div onMouseDown={(event) => handleMouseDown(event, "select")} style={shapeStyle("circle")}>Select</div>
      <div onMouseDown={(event) => handleMouseDown(event, "square")} style={shapeStyle("square")}>Rect</div>
      <div style={shapeStyle("circle")}>A</div>
      <div style={shapeStyle("rectangle")}>C</div>
    </div>
  );
};

export default Toolbar;
