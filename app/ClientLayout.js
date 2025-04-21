"use client";

import { useEffect } from "react";

export default function ClientLayout({ children }) {
  useEffect(() => {
    const preventZoom = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventZoom, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventZoom);
    };
  }, []);

  return children;
} 