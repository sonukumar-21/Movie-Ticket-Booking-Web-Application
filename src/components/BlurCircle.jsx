import React from "react";

const BlurCircle = ({
  top = "auto",
  left = "auto",
  right = "auto",
  bottom = "auto",
  size = "150px",
  color = "bg-red-500/30",
}) => {
  return (
    <div
      className={`absolute rounded-full blur-3xl ${color} -z-50`}
      style={{
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
      }}
    ></div>
  );
};

export default BlurCircle;
