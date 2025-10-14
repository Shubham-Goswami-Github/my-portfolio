import React from "react";


const AnimatedPlanetStarBackground = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      zIndex: 0,
      pointerEvents: "none",
      background: "var(--portfolio-bg, #fff)",
      transition: "background 0.4s cubic-bezier(.4,0,.2,1)",
    }}
    className="portfolio-bg"
  />
);

export default AnimatedPlanetStarBackground;

// Add theme-aware background color via CSS
// In your global CSS (e.g., index.css or App.css), add:
//
// .portfolio-bg {
//   --portfolio-bg: #fff;
// }
// .dark .portfolio-bg {
//   --portfolio-bg: #10131a;
// }

