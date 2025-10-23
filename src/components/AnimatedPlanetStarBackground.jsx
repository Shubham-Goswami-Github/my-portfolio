import React from "react";

// Minimal theme-aware background component (no animations or effects)
const AnimatedPlanetStarBackground = () => (
  <div
    className="portfolio-bg"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      zIndex: 0,
      pointerEvents: "none",
      background: "var(--portfolio-bg, #fff)",
      transition: "background 0.25s ease",
    }}
  />
);

export default AnimatedPlanetStarBackground;

