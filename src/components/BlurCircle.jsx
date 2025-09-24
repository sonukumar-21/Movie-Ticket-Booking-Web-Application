import React from "react";

/**
 * Glow / blur element that uses a radial-gradient + CSS blur so the glow
 * looks soft and never turns blackish on dark backgrounds.
 *
 * Props:
 *  - top, left, right, bottom : CSS position values (strings)
 *  - size : width & height (string, e.g. "180px")
 *  - color : base rgb color as array or string (we keep default red)
 *  - blur : blur radius in px (number)
 *  - z : z-index (number)
 */
const BlurCircle = ({
  top = "auto",
  left = "auto",
  right = "auto",
  bottom = "auto",
  size = "180px",
  // default color: red glow (r,g,b)
  color = [255, 60, 60],
  blur = 40,
  z = 5,
}) => {
  const [r, g, b] = Array.isArray(color) ? color : [255, 60, 60];
  // radial gradient: center strong, edges transparent
  const bg = `radial-gradient(circle at 40% 30%, rgba(${r}, ${g}, ${b}, 0.8) 0%, rgba(${r}, ${g}, ${b}, 0.45) 30%, rgba(${r}, ${g}, ${b}, 0.08) 60%, rgba(${r}, ${g}, ${b}, 0) 100%)`;

  const style = {
    position: "absolute",
    top,
    left,
    right,
    bottom,
    width: size,
    height: size,
    background: bg,
    filter: `blur(${blur}px)`,
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: z,
    transform: "translateZ(0)", // helps with some GPU rendering
  };

  return <div style={style} aria-hidden="true" />;
};

export default BlurCircle;
