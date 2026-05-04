import React from "react";

const BlurCircle = ({
  top = "auto",
  left = "auto",
  right = "auto",
  bottom = "auto",
}) => {
  return (
    <div
      className="absolute -z-10 w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full bg-primary/20 blur-[80px] pointer-events-none"
      style={{ top, left, right, bottom }}
    />
  );
};

export default BlurCircle;

