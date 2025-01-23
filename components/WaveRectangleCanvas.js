"use client";
import React, { useRef, useEffect } from "react";

const AnimatedWavyBorderCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = 400;
    canvas.height = 400;

    // Animation state
    let amplitude = 0; // Initial amplitude
    let direction = 1; // Direction of amplitude change

    // Function to draw a rectangle with a wavy border
    const drawWavyBorder = (x, y, width, height, waveAmplitude, waveFrequency) => {
      ctx.beginPath(); // Start a new path

      // Top edge (wavy)
      for (let i = 0; i <= width; i++) {
        const offset = Math.sin((i / waveFrequency) * Math.PI * 2) * waveAmplitude;
        ctx.lineTo(x + i, y + offset);
      }

      // Right edge (wavy)
      for (let i = 0; i <= height; i++) {
        const offset = Math.sin((i / waveFrequency) * Math.PI * 2) * waveAmplitude;
        ctx.lineTo(x + width + offset, y + i);
      }

      // Bottom edge (wavy)
      for (let i = width; i >= 0; i--) {
        const offset = Math.sin((i / waveFrequency) * Math.PI * 2) * waveAmplitude;
        ctx.lineTo(x + i, y + height + offset);
      }

      // Left edge (wavy)
      for (let i = height; i >= 0; i--) {
        const offset = Math.sin((i / waveFrequency) * Math.PI * 2) * waveAmplitude;
        ctx.lineTo(x + offset, y + i);
      }

      ctx.closePath(); // Close the path

      // Fill and stroke
      ctx.fillStyle = "lightblue";
      ctx.fill(); // Fill the rectangle
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 2;
      ctx.stroke(); // Draw the wavy border
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      // Draw the rectangle with updated amplitude
      drawWavyBorder(50, 50, 300, 200, amplitude, 40); // 40 is the wave frequency

      // Update amplitude for the next frame
      amplitude += direction * 0.5; // Change amplitude gradually
      if (amplitude > 50 || amplitude < 5) {
        direction *= -1; // Reverse direction when limits are reached
      }

      requestAnimationFrame(animate); // Schedule the next frame
    };

    animate(); // Start the animation

    return () => {
      cancelAnimationFrame(animate); // Cleanup on component unmount
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ border: "1px solid black" }} // Optional: Add a border to the canvas
    />
  );
};

export default AnimatedWavyBorderCanvas;
